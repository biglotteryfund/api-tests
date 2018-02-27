const superagent = require('superagent');
const { apiUrl, expectCommonShape } = require('./helpers');
const { compose, map } = require('lodash/fp');

const mapContent = map('attributes.content');
const mapTitles = compose(map('title'), mapContent);

beforeAll(() => {
  jest.setTimeout(10000);
});

test('it should return a list of funding programmes', () => {
  return superagent.get(apiUrl('/v1/en/funding-programmes')).then(res => {
    const { body } = res;

    expectCommonShape(res);

    expect(mapTitles(body.data)).toContain(
      'National Lottery Awards for All England'
    );
    expect(mapTitles(body.data)).toContain(
      'National Lottery Awards for All Wales'
    );
    expect(mapTitles(body.data)).toContain(
      'National Lottery Awards for All Scotland'
    );
  });
});

test('it should return a list of translated funding programmes', () => {
  return superagent.get(apiUrl('/v1/cy/funding-programmes')).then(res => {
    const { body } = res;

    expectCommonShape(res);

    expect(mapTitles(body.data)).toContain(
      'Arian i Bawb y Loteri Genedlaethol Cymru'
    );
  });
});
