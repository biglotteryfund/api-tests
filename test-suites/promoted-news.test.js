const superagent = require('superagent');
const { mapAttrs, apiUrl, expectCommonResponse, expectListShape, newsShape } = require('./helpers');

test('it should return a list of promoted news', () => {
  return superagent.get(apiUrl('/v1/en/updates?promoted=1')).then(res => {
    const { body } = res;
    expectCommonResponse({ res, includeMeta: true });
    const attrs = mapAttrs(body);
    expect(attrs.length).toBeGreaterThanOrEqual(3);
    expectListShape(attrs, newsShape);
  });
});
