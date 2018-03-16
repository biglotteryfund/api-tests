const superagent = require('superagent');
const {
  mapAttrs,
  apiUrl,
  expectListShape,
  expectCommonResponse
} = require('./helpers');

test.only('it should return a list of profiles for a given section', () => {
  return superagent
    .get(apiUrl('/v1/en/profiles/seniorManagementTeam'))
    .then(res => {
      const { body } = res;
      const attrs = mapAttrs(body);
      expectCommonResponse({ res, includeMeta: true });
      expectListShape(attrs, {
        title: expect.any(String),
        role: expect.any(String),
        image: expect.any(String),
        bio: expect.any(String)
      });
    });
});

test.only('it should return an error if an invalid section is requested', () => {
  return superagent.get(apiUrl('/v1/en/profiles/badSection')).catch(err => {
    expect(err.status).toBe(500);
    expect(err.response.res.statusMessage).toBe('Invalid section');
  });
});
