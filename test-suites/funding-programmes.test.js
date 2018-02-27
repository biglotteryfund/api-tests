const superagent = require('superagent');
const { mapAttrs, apiUrl, expectCommonResponse } = require('./helpers');
const { compose, map } = require('lodash/fp');

const mapTitles = compose(map('content.title'), mapAttrs);

beforeAll(() => {
  jest.setTimeout(10000);
});

test('it should return a list of funding programmes', () => {
  return superagent.get(apiUrl('/v1/en/funding-programmes')).then(res => {
    const { body } = res;
    expectCommonResponse({ res, includeMeta: true });
    const titles = mapTitles(body);
    expect(titles).toEqual(
      expect.arrayContaining([
        'National Lottery Awards for All England',
        'National Lottery Awards for All Wales',
        'National Lottery Awards for All Scotland'
      ])
    );
  });
});

test('it should return a list of translated funding programmes', () => {
  return superagent.get(apiUrl('/v1/cy/funding-programmes')).then(res => {
    const { body } = res;
    expectCommonResponse({ res, includeMeta: true });
    expect(mapTitles(body)).toContain(
      'Arian i Bawb y Loteri Genedlaethol Cymru'
    );
  });
});
