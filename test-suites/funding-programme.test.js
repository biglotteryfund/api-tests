const superagent = require('superagent');
const { apiUrl, expectCommonResponse, expectHeroShape } = require('./helpers');

beforeAll(() => {
  jest.setTimeout(10000);
});

function expectProgrammeShape(attrs) {
  expect(attrs).toHaveProperty('title');
  expect(attrs).toHaveProperty('description');
  expect(attrs).toHaveProperty('hero');
  expect(attrs).toHaveProperty('contentSections');
  expectHeroShape(attrs.hero);
}

test('it should return a single funding programme', () => {
  return superagent
    .get(
      apiUrl('/v2/en/funding-programmes/national-lottery-awards-for-all-england')
    )
    .then(res => {
      const { body } = res;
      const attrs = body.data.attributes;

      expectCommonResponse({ res });
      expectProgrammeShape(attrs);

      const title = attrs.title;
      expect(title).toBe('National Lottery Awards for All England');
    });
});

test('it should return a single funding programme in welsh', () => {
  return superagent
    .get(
      apiUrl('/v2/cy/funding-programmes/national-lottery-awards-for-all-wales')
    )
    .then(res => {
      const { body } = res;
      const attrs = body.data.attributes;

      expectCommonResponse({ res });
      expectProgrammeShape(attrs);

      const title = attrs.title;
      expect(title).toBe('Arian i Bawb y Loteri Genedlaethol Cymru');
    });
});
