const { map } = require('lodash/fp');

require('dotenv').config();

const mapAttrs = body => map('attributes')(body.data);

const API_ENDPOINT = process.env.API_ENDPOINT;

const apiUrl = urlPath => `${API_ENDPOINT}${urlPath}`;

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

module.exports = {
  mapAttrs,
  apiUrl,
  expectListShape,
  expectCommonResponse
};
