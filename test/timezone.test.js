const { getTimeZone } = require('./timeZone');
require('dotenv').config();

describe('Time Zone API Tests', () => {
  const validKey = process.env.apikey; // Insira sua chave de API válida aqui
  const invalidKey = 'invalid_key';

  const testCases = [
    { id: 'CT01', location: { lat: 55.755826, lng: 37.6173 }, timestamp: 1627682944, apiKey: validKey, expected: { timeZoneId: "Europe/Moscow", timeZoneName: "Moscow Standard Time" } },
    // Adicione os outros 49 casos de teste aqui
  ];

  testCases.forEach(({ id, location, timestamp, apiKey, expected }) => {
    test(`${id} - Testing Time Zone API`, async () => {
      try {
        const data = await getTimeZone(location, timestamp, apiKey);
        expect(data.timeZoneId).toBe(expected.timeZoneId);
        expect(data.timeZoneName).toBe(expected.timeZoneName);
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
