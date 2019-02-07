const superagent = require('superagent');
const { apiUrl, expectCommonResponse, expectListShape } = require('./helpers');

const mediaRegex = /\.jpg/;
const homepageFeaturedLinkShape = {
  href: expect.any(String),
  image: expect.objectContaining({
    title: expect.any(String),
    caption: expect.any(String),
    default: expect.stringMatching(mediaRegex),
    small: expect.stringMatching(mediaRegex),
    medium: expect.stringMatching(mediaRegex),
    large: expect.stringMatching(mediaRegex),
  }),
  label: expect.any(String),
};

test('it should get data for the homepage', () => {
  return superagent
    .get(apiUrl('/v1/en/homepage'))
    .then(res => {
      const { body } = res;
      const attrs = body.data.attributes;
      expectCommonResponse({ res });
      expect(attrs.featuredLinks[0]).toEqual(
        expect.objectContaining(homepageFeaturedLinkShape)
      );
      expectListShape(attrs.featuredLinks, homepageFeaturedLinkShape);
    });
});
