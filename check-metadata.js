/*
 * Validates the page metadata we depend on for search and sharing.
 * Invalid structured data is worse than none, so this must pass before deploy.
 */
const fs = require('fs');

const PAGES = [
  { file: 'index.html',        canonical: 'https://henriqueyuri00.github.io/acr-builder/' },
  { file: 'sprint/index.html', canonical: 'https://henriqueyuri00.github.io/acr-builder/sprint/' },
];

let failures = 0;
const check = (cond, label, extra) => {
  if (!cond) failures++;
  console.log((cond ? '  PASS ' : '  FAIL ') + label + (extra !== undefined ? '  [' + extra + ']' : ''));
};

for (const page of PAGES) {
  const html = fs.readFileSync(page.file, 'utf8');
  console.log('\n' + page.file);

  const canon = html.match(/<link rel="canonical" href="([^"]+)"/);
  check(!!canon && canon[1] === page.canonical, 'canonical url', canon && canon[1]);

  for (const prop of ['og:type', 'og:url', 'og:title', 'og:description']) {
    const m = html.match(new RegExp('<meta property="' + prop + '" content="([^"]+)"'));
    check(!!m && m[1].length > 0, prop, m && m[1].slice(0, 46));
  }
  check(/<meta name="twitter:card"/.test(html), 'twitter:card');

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  check(blocks.length === 1, 'exactly one JSON-LD block', blocks.length);

  blocks.forEach((b, i) => {
    try {
      const data = JSON.parse(b[1]);
      check(data['@context'] === 'https://schema.org', 'JSON-LD @context');
      check(!!data['@type'], 'JSON-LD @type', data['@type']);
      check(data.url === page.canonical, 'JSON-LD url matches canonical', data.url);
      if (data.offers) {
        check(!!data.offers.price && !!data.offers.priceCurrency,
              'offer price', data.offers.price + ' ' + data.offers.priceCurrency);
      }
    } catch (e) {
      check(false, 'JSON-LD block ' + (i + 1) + ' parses', e.message);
    }
  });
}

console.log('\n' + (failures ? failures + ' FAILURE(S)' : 'All metadata checks passed'));
process.exit(failures ? 1 : 0);
