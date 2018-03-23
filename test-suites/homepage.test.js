const superagent = require('superagent');
const { apiUrl, expectCommonResponse, expectListShape, newsShape } = require('./helpers');

const mediaRegex = /\.jpg/;
const homepageHeroShape = {
  caption: expect.any(String),
  default: expect.stringMatching(mediaRegex),
  small: expect.stringMatching(mediaRegex),
  medium: expect.stringMatching(mediaRegex),
  large: expect.stringMatching(mediaRegex)
};

test('it should data for the homepage', () => {
  return superagent
    .get(apiUrl('/v1/en/homepage'))
    .then(res => {
      const { body } = res;
      const attrs = body.data.attributes;
      expectCommonResponse({ res });
      expect(attrs.heroImages.default).toEqual(
        expect.objectContaining(homepageHeroShape)
      );
      expectListShape(attrs.heroImages.candidates, homepageHeroShape);
      expectListShape(attrs.newsArticles, newsShape);
    });
});
