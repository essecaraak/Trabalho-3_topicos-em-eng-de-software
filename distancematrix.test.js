const { getDistanceMatrix } = require('./distanceMatrix');
require('dotenv').config();

describe('Distance Matrix API Tests', () => {
  const validKey = process.env.apiKey; // Insira sua chave de API válida aqui
  const invalidKey = "invalid";
  const intKey = parseInt(validKey);
  const testCases = [
    {
      id: 'CT01',
      origins: ['Av. Gov. Paulo Barreto de Menezes, Aracaju - SE, Brazil', 'Rio de Janeiro, State of Rio de Janeiro, Brazil'],
      destinations: ['R. Sergipe - Siqueira Campos, Aracaju - SE, 49075-540, Brazil', 'São Paulo, State of São Paulo, Brazil'],
      apiKey: validKey,
      expected: [
        [
          { distance: { min: "6.6 km", max:"7km"}, duration: { min: "15 minutos",max:"1horas"} },
          { distance: { min: "2,160 km", max:"70000km"}, duration: { min: "1 dia 6 horas",max:"2dias" } }
        ],
        
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
        let apiKeyToUse = validKey; // Default to validKey
        if (apiKey === "invalidkey") {
          apiKeyToUse = invalidKey;
        } else if (apiKey === "integerkey") {
          apiKeyToUse = intKey;
        }else if (apiKey === null) {
          apiKeyToUse = null;
        }else if (apiKey === "doublekey") {
          apiKeyToUse = [validKey,validKey];
        }
        const data = await getDistanceMatrix(origins, destinations, apiKeyToUse);
        if (expected.status) {
          await expect(data.status).toBe(expected.status);
        } else {
        data.rows.forEach((row, rowIndex) => {
          row.elements.forEach((element, colIndex) => {
            expect(element.distance.text).toBe(expected[rowIndex][colIndex].distance.text);
            expect(element.duration.text).toBe(expected[rowIndex][colIndex].duration.text);
          });
        });
      }
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
