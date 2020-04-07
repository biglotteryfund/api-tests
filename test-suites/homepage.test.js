const superagent = require('superagent');
const { apiUrl, expectCommonResponse, expectListShape } = require('./helpers');

const mediaRegex = /\.jpg/;
const homepageFeaturedLinkShape = {
  href: expect.any(String),
  label: expect.any(String),
  image: expect.objectContaining({
    title: expect.any(String),
    default: expect.stringMatching(mediaRegex),
    small: expect.stringMatching(mediaRegex),
    medium: expect.stringMatching(mediaRegex),
    large: expect.stringMatching(mediaRegex),
  }),
};

test('it should get data for the homepage', () => {
  return superagent.get(apiUrl('/v1/en/homepage')).then((res) => {
    const { body } = res;
    const attrs = body.data.attributes;
    expectCommonResponse({ res });
    expectListShape(attrs.featuredLinks, homepageFeaturedLinkShape);
  });
});
