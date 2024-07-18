const { getDistanceMatrix } = require('./distanceMatrix');
require('dotenv').config();

describe('Distance Matrix API Tests', () => {
  const validKey = process.env.apikey; // Insira sua chave de API válida aqui
  const invalidKey = 'invalid_key';

  const testCases = [
    { id: 'CT01', origins: 'Av. Gov. Paulo Barreto de Menezes, Aracaju - SE, Brazil', destinations: ['R. Sergipe - Siqueira Campos, Aracaju - SE, 49075-540, Brazil'], apiKey: validKey, expected: { distance: { text: "6.6 km" }, duration: { text: "15 mins"}, status: "OK" } },
    { id: 'CT02', origins: 'Av. Gov. Paulo Barreto de Menezes, Aracaju - SE, Brazil', destinations: ['São Paulo, State of São Paulo, Brazil'], apiKey: validKey, expected: { distance: { text: "2,160 km"}, duration: { text: "1 day 6 hours"}, status: "OK" } },
    // Adicione os outros 48 casos de teste aqui
  ];

  testCases.forEach(({ id, origins, destinations, apiKey, expected }) => {
    test(`${id} - Testing Distance Matrix API`, async () => {
      try {
        const data = await getDistanceMatrix(origins, destinations, apiKey);
        expect(data.rows[0].elements[0].distance).toEqual(expected.distance);
        expect(data.rows[0].elements[0].duration).toEqual(expected.duration);
        expect(data.rows[0].elements[0].status).toBe(expected.status);
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
