const superagent = require('superagent');
const { mapAttrs, apiUrl, expectCommonResponse } = require('./helpers');
const { sample } = require('lodash/fp');

test('it should return a list of promoted news', () => {
  return superagent.get(apiUrl('/v1/en/promoted-news')).then(res => {
    const { body } = res;
    expectCommonResponse({ res, includeMeta: true });
    const attrs = mapAttrs(body);
    expect(attrs.length).toBeGreaterThanOrEqual(3);
    const sampled = sample(attrs);
    expect(Object.keys(sampled)).toEqual(
      expect.arrayContaining(['title', 'summary', 'link'])
    );
  });
});
