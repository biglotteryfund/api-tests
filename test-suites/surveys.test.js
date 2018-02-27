const superagent = require('superagent');
const {
  mapAttrs,
  apiUrl,
  expectListShape,
  expectCommonResponse
} = require('./helpers');
const { flatMap } = require('lodash/fp');

function expectSurveyShape(body) {
  const attrs = mapAttrs(body);
  const choices = flatMap('choices')(attrs);

  expect(attrs.length).toBeGreaterThanOrEqual(3);

  expectListShape(attrs, {
    surveyPath: expect.any(String),
    title: expect.any(String),
    question: expect.any(String),
    choices: expect.any(Array)
  });

  expectListShape(choices, {
    title: expect.any(String),
    allowMessage: expect.any(Boolean)
  });
}

test.only('it should return a list of active survey', () => {
  return superagent.get(apiUrl('/v1/en/surveys')).then(res => {
    const { body } = res;
    expectCommonResponse({ res, includeMeta: true });
    expectSurveyShape(body);

    const attrs = mapAttrs(body);
    expectListShape(attrs, {
      status: 'live'
    });
  });
});

test.only('it should return a list of all surveys', () => {
  return superagent.get(apiUrl('/v1/en/surveys?all=true')).then(res => {
    const { body } = res;
    expectCommonResponse({ res, includeMeta: true });
    expectSurveyShape(body);

    const attrs = mapAttrs(body);
    expectListShape(attrs, {
      status: expect.stringMatching(/live|disabled/)
    });
  });
});
