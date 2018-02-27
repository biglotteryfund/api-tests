const superagent = require('superagent');
const { apiUrl, expectCommonShape } = require('./helpers');

beforeAll(() => {
  jest.setTimeout(10000);
});

function expectProgrammeShape(attrs) {
  expect(attrs).toHaveProperty('title');
  expect(attrs).toHaveProperty('summary');
  expect(attrs).toHaveProperty('hero');
  expect(attrs).toHaveProperty('intro');
}

test('it should return a single funding programme', () => {
  return superagent
    .get(
      apiUrl('/v1/en/funding-programme/national-lottery-awards-for-all-england')
    )
    .then(res => {
      const { body } = res;
      const attrs = body.data.attributes;

      expectCommonShape({ res });
      expectProgrammeShape(attrs);

      const title = attrs.summary.title;
      expect(title).toBe('National Lottery Awards for All England');
    });
});

test('it should return a single funding programme in welsh', () => {
  return superagent
    .get(
      apiUrl('/v1/cy/funding-programme/national-lottery-awards-for-all-england')
    )
    .then(res => {
      const { body } = res;
      const attrs = body.data.attributes;

      expectCommonShape({ res });
      expectProgrammeShape(attrs);

      const title = attrs.summary.title;
      expect(title).toBe('Arian i Bawb y Loteri Genedlaethol Lloegr');
    });
});
