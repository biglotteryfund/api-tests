const superagent = require('superagent');
const { apiUrl, expectCommonResponse, expectHeroShape } = require('./helpers');

test('it should return hero image for a given slug', () => {
  return superagent
    .get(apiUrl('/v1/en/hero-image/funding-under-10k-new'))
    .then(res => {
      const { body } = res;
      expectCommonResponse({ res });
      expectHeroShape(body.data.attributes);
    });
});
