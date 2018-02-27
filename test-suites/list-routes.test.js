const superagent = require('superagent');
const { mapAttrs, apiUrl, expectCommonResponse } = require('./helpers');
const { compose, map } = require('lodash/fp');

const mapPaths = compose(map('path'), mapAttrs);

test('it should return a list of all canonical routes powered by the CMS', () => {
  return superagent.get(apiUrl('/v1/list-routes')).then(res => {
    const { body } = res;

    expectCommonResponse({ res, includeMeta: true });

    const paths = mapPaths(body);
    // expect(paths).toContain('/about/strategic-framework');
    expect(paths).toContain('/funding/funding-guidance/information-checks');
    expect(paths).toContain(
      '/funding/programmes/national-lottery-awards-for-all-england'
    );
    expect(paths).toContain(
      '/funding/programmes/building-better-opportunities'
    );
  });
});
