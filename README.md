# nathaniel-liong-site-tests

Functional tests for nathaniel-liong-site, written in Playwright with TypeScript.

Tests run against a live URL supplied via the `BASE_URL` environment variable, and are derived from `SPEC.md` and issue text rather than site source code.

## Running tests

```bash
npm install
BASE_URL=https://example.com npx playwright test
```
