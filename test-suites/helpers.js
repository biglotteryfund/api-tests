const { map } = require('lodash/fp');

require('dotenv').config();

const mapAttrs = (body) => map('attributes')(body.data);

const API_ENDPOINT = process.env.API_ENDPOINT;

const apiUrl = (urlPath) => `${API_ENDPOINT}${urlPath}`;

function expectListShape(xs, shape) {
  expect(xs).toContainEqual(expect.objectContaining(shape));
}

function expectCommonResponse({ res, includeMeta = false }) {
  const { body } = res;

  expect(res.statusCode).toBe(200);
  expect(res.type).toBe('application/json');

  if (includeMeta) {
    expect(body).toHaveProperty('data');
    expect(body).toHaveProperty('meta');
    expect(body).toHaveProperty('links');
  }
}

const newsShape = {
  title: expect.any(String),
  regions: expect.any(Array),
  summary: expect.any(String),
};

function expectNewsShape(newsArticle) {
  expect(newsArticle).toEqual(expect.objectContaining(newsShape));
}

const mediaRegex = /\.jpg/;
const heroShape = {
  title: expect.any(String),
  default: expect.stringMatching(mediaRegex),
  small: expect.stringMatching(mediaRegex),
  medium: expect.stringMatching(mediaRegex),
  large: expect.stringMatching(mediaRegex),
};

function expectHeroShape(heroImage) {
  expect(heroImage).toEqual(expect.objectContaining(heroShape));
  // Optional/nullable properties
  expect(heroImage).toHaveProperty('caption');
}

module.exports = {
  mapAttrs,
  apiUrl,
  expectListShape,
  expectCommonResponse,
  newsShape,
  expectNewsShape,
  heroShape,
  expectHeroShape,
};
