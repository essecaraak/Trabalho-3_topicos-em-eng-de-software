const { getGeocoding } = require('./geocoding');
require('dotenv').config();

describe('Geocoding API Tests', () => {
  const validKey = process.env.apikey; // Insira sua chave de API válida aqui
  const invalidKey = 'invalid_key';

  const testCases = [
    { id: 'CT01', input: 'R. Montreal, 9 - Santa Cruz, Rio de Janeiro - RJ, 23525-020, Brazil', apiKey: validKey, expected: { lat: -22.9420398, lng: -43.6849224, formatted_address: "R. Montreal, 9 - Santa Cruz, Rio de Janeiro - RJ, 23525-020, Brazil"} },
    // Adicione os outros 49 casos de teste aqui
  ];

  testCases.forEach(({ id, input, apiKey, expected }) => {
    test(`${id} - Testing Geocoding API`, async () => {
      try {
        const data = await getGeocoding(input, apiKey);
        expect(data.results[0].geometry.location.lat).toBe(expected.lat);
        expect(data.results[0].geometry.location.lng).toBe(expected.lng);
        expect(data.results[0].formatted_address).toBe(expected.formatted_address);
      } catch (error) {
        if (expected.error) {
          expect(error).toBeDefined();
        } else {
          throw error;
        }
      }
    });
  });
});
