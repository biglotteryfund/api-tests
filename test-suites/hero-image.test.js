const superagent = require('superagent');
const { apiUrl, expectCommonResponse, expectHeroShape } = require('./helpers');

test.only('it should return hero image for a given slug', () => {
  return superagent
    .get(apiUrl('/v1/en/hero-image/passion-4-fusion'))
    .then(res => {
      const { body } = res;
      expectCommonResponse({ res });
      expectHeroShape(body.data.attributes);
    });
});
