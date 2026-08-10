/*
 * Inlines criteria.js into index.html to produce a single self-contained file that
 * works from a local filesystem with no server. Verifies the result rather than
 * trusting the string replace.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const js   = fs.readFileSync(path.join(ROOT, 'criteria.js'), 'utf8');

const TAG = '<script src="criteria.js"></script>';
if (!html.includes(TAG)) {
  console.error('FAIL: expected script tag not found — build assumptions are stale.');
  process.exit(1);
}

// A literal "</script>" inside the inlined source would terminate the block early.
if (/<\/script/i.test(js)) {
  console.error('FAIL: criteria.js contains a closing script tag and cannot be inlined verbatim.');
  process.exit(1);
}

const out = html.replace(TAG, '<script>\n' + js + '\n</script>');

// Verify: the criteria data must survive the inline intact.
// The file carries the union of both standards — 56 entries, from which
// WCAG 2.1 draws 50 and WCAG 2.2 draws 55 (2.1 minus 4.1.1, plus six new).
const ids = [...out.matchAll(/id:\s*"(\d+\.\d+\.\d+)"/g)].map(m => m[1]);
const levelA  = [...out.matchAll(/level:\s*"A"/g)].length;
const levelAA = [...out.matchAll(/level:\s*"AA"/g)].length;

const problems = [];
if (ids.length !== 56)  problems.push(`expected 56 criteria entries, inlined ${ids.length}`);
if (levelA !== 32)      problems.push(`expected 32 Level A entries, got ${levelA}`);
if (levelAA !== 24)     problems.push(`expected 24 Level AA entries, got ${levelAA}`);
if (new Set(ids).size !== ids.length) problems.push('duplicate criterion ids after inline');
if (out.includes(TAG))  problems.push('external script tag still present');
if (!/function criteriaFor/.test(out)) problems.push('criteriaFor() missing from the inlined build');

if (problems.length) {
  console.error('FAIL:\n  ' + problems.join('\n  '));
  process.exit(1);
}

const dest = path.join(ROOT, 'dist');
fs.mkdirSync(dest, { recursive: true });
fs.writeFileSync(path.join(dest, 'acr-builder.html'), out);

console.log('OK  dist/acr-builder.html');
console.log(`    ${ids.length} criteria (${levelA} A / ${levelAA} AA), ${(out.length/1024).toFixed(0)} KB, zero external requests`);
