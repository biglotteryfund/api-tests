const superagent = require('superagent');
const {
  mapAttrs,
  apiUrl,
  expectCommonResponse,
  expectHeroShape
} = require('./helpers');
const { compose, head } = require('lodash/fp');

const extractItem = compose(
  head,
  mapAttrs
);

test('it should return a content for a general page', () => {
  return superagent
    .get(apiUrl('/v1/en/listing?path=about/strategic-framework'))
    .then(res => {
      const { body } = res;
      expectCommonResponse({ res, includeMeta: true });
      const item = extractItem(body);

      expect(item).toEqual(
        expect.objectContaining({
          title: expect.any(String),
          status: 'live',
          introduction: expect.any(String)
        })
      );

      expectHeroShape(item.hero);

      expect(item.availableLanguages).toContain('en');
    });
});
