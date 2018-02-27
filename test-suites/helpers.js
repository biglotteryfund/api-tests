require('dotenv').config();

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
  apiUrl,
  expectCommonShape
};
