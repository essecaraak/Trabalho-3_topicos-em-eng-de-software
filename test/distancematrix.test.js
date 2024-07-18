/*const { getDistanceMatrix } = require('./distanceMatrix');
require('dotenv').config();

describe('Distance Matrix API Tests', () => {
  const validKey = process.env.GOOGLE_API_KEY; // Insira sua chave de API válida aqui

  const testCases = [
    {
      id: 'CT01',
      origins: ['Av. Gov. Paulo Barreto de Menezes, Aracaju - SE, Brazil', 'Rio de Janeiro, State of Rio de Janeiro, Brazil'],
      destinations: ['R. Sergipe - Siqueira Campos, Aracaju - SE, 49075-540, Brazil', 'São Paulo, State of São Paulo, Brazil'],
      apiKey: validKey,
      expected: [
        [
          { distance: { text: "6.6 km" }, duration: { text: "15 mins" } },
          { distance: { text: "2,160 km" }, duration: { text: "1 day 6 hours" } }
        ],
        [
          { distance: { text: "1,824 km" }, duration: { text: "1 day 3 hours" } },
          { distance: { text: "435 km" }, duration: { text: "5 hours 40 mins" } }
        ]
      ]
    },
    {
      id: 'CT02',
      origins: ['rio de janeiro'],
      destinations: ['são paulo'],
      apiKey: validKey,
      expected: [
        [
          { distance: { text: "6.6 km" }, duration: { text: "15 mins" } },
        ],
        
      ]
    },
    // Adicione os outros casos de teste aqui
  ];

  testCases.forEach(({ id, origins, destinations, apiKey, expected }) => {
    test(`${id} - Testing Distance Matrix API`, async () => {
      try {
        const data = await getDistanceMatrix(origins, destinations, apiKey);

        data.rows.forEach((row, rowIndex) => {
          row.elements.forEach((element, colIndex) => {
            expect(element.distance.text).toBe(expected[rowIndex][colIndex].distance.text);
            expect(element.duration.text).toBe(expected[rowIndex][colIndex].duration.text);
          });
        });

      } catch (error) {
        if (expected.error) {
          expect(error).toBeDefined();
        } else {
          throw error;
        }
      }
    });
  });
});*/
