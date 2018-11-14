const superagent = require('superagent');
const { mapAttrs, apiUrl, expectCommonResponse } = require('./helpers');
const { map, sortedUniq } = require('lodash/fp');

const uniqTypes = results => sortedUniq(map('entryType')(results));

test('it should return a list of all updates', () => {
  return superagent.get(apiUrl('/v1/en/updates')).then(res => {
    const { body } = res;

    expectCommonResponse({ res, includeMeta: true });

    const results = mapAttrs(body);
    const types = uniqTypes(results);

    expect(types).toEqual(
      expect.arrayContaining(['blog', 'press_releases', 'updates'])
    );
  });
});

test('it should return a list of blog posts', () => {
  return superagent.get(apiUrl('/v1/en/updates/blog')).then(res => {
    const { body } = res;

    expectCommonResponse({ res, includeMeta: true });

    const results = mapAttrs(body);
    const types = uniqTypes(results);

    expect(types).toEqual(expect.arrayContaining(['blog']));
  });
});
