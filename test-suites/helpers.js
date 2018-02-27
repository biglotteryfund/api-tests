const { map } = require('lodash/fp');

require('dotenv').config();

const mapAttrs = body => map('attributes')(body.data);

const API_ENDPOINT = process.env.API_ENDPOINT;

function apiUrl(urlPath) {
  const fullUrl = `${API_ENDPOINT}${urlPath}`;
  console.log(`Fetching: ${fullUrl}`);
  return fullUrl;
}

function expectCommonShape(res) {
  const { body } = res;

  expect(res.statusCode).toBe(200);
  expect(res.type).toBe('application/json');

  expect(body).toHaveProperty('data');
  expect(body).toHaveProperty('meta');
  expect(body).toHaveProperty('links');
}

module.exports = {
  mapAttrs,
  apiUrl,
  expectCommonShape
};
