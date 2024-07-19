require('dotenv').config();
const { getDistanceMatrix } = require('./distanceMatrix');

function parseTimeToSeconds(timeString) {
  const timeUnits = {
    day: 24 * 60 * 60,   // 24 horas * 60 minutos * 60 segundos
    days: 24 * 60 * 60,
    hour: 60 * 60,       // 60 minutos * 60 segundos
    hours: 60 * 60,
    minute: 60,          // 60 segundos
    minutes: 60,
    min: 60,             // 60 segundos
    mins: 60,            // 60 segundos
    second: 1,           // 1 segundo
    seconds: 1
  };

  let totalSeconds = 0;

  // Usa uma expressão regular para encontrar todos os valores e suas unidades
  const regex = /(\d+)\s*(day|days|hour|hours|minute|minutes|min|mins|second|seconds)/gi;
  let match;

  while ((match = regex.exec(timeString)) !== null) {
    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();
    totalSeconds += value * timeUnits[unit];
  }

  return totalSeconds;
}

function parseDistanceToMeters(distanceString) {
  const distanceUnits = {
    km: 1000,  // 1 km = 1000 metros
    m: 1,      // 1 metro = 1 metro
    mi: 1609.34 // 1 milha = 1609.34 metros
  };

  let totalMeters = 0;

  // Usa uma expressão regular para encontrar todos os valores e suas unidades
  const regex = /(\d+\.?\d*)\s*(km|m|mi)/gi;
  let match;

  while ((match = regex.exec(distanceString)) !== null) {
    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    totalMeters += value * distanceUnits[unit];
  }

  return totalMeters;
}

function isWithinRange(value, min, max) {
  if(value>=min&& value<=max){
    return true;
  }else{
    return false;
  }
  
}

describe('Distance Matrix API Tests', () => {
  const validKey = process.env.apiKey; // Insira sua chave de API válida aqui
  const invalidKey = "invalid";
  const intKey = parseInt(validKey, 10);

  const testCases = [
    {
      id: 'CT01',
      origins: ['Av. Gov. Paulo Barreto de Menezes, Aracaju - SE, Brazil', 'Rio de Janeiro, State of Rio de Janeiro, Brazil'],
      destinations: ['R. Sergipe - Siqueira Campos, Aracaju - SE, 49075-540, Brazil', 'São Paulo, State of São Paulo, Brazil'],
      apiKey: validKey,
      expected: [
        [
          { distance: { min: "6 km", max: "7 km" }, duration: { min: "10 mins", max: "1 hour" } },
          { distance: { min: "2,100 km", max: "7000 km" }, duration: { min: "1 day ", max: "2 days" } }
        ],
        [
          { distance: { min: "1,500 km", max: "2000 km" }, duration: { min: "1 day", max: "1 day 5 hours" } },
          { distance: { min: "500 km", max: "600 km" }, duration: { min: " 6 hours", max: "8 hours" } }
        ]
      ]
    },
    
    // Adicione outros casos de teste aqui
  ];

  testCases.forEach(({ id, origins, destinations, apiKey, expected }) => {
    test(`${id} - Testing Distance Matrix API`, async () => {
      try {
        let apiKeyToUse = validKey; // Default to validKey

        if (apiKey === "invalidkey") {
          apiKeyToUse = invalidKey;
        } else if (apiKey === "integerkey") {
          apiKeyToUse = intKey;
        } else if (apiKey === null) {
          apiKeyToUse = null;
        } else if (apiKey === "doublekey") {
          apiKeyToUse = [validKey, validKey];
        }

        const data = await getDistanceMatrix(origins, destinations, apiKeyToUse);

        if (expected.status) {
          expect(data.status).toBe(expected.status);
        } else {
          data.rows.forEach((row, rowIndex) => {
            row.elements.forEach((element, colIndex) => {
              const actualDistance = parseDistanceToMeters(element.distance.text);
              const expectedDistanceMin = parseDistanceToMeters(expected[rowIndex][colIndex].distance.min);
              const expectedDistanceMax = parseDistanceToMeters(expected[rowIndex][colIndex].distance.max);
              const actualTime = parseTimeToSeconds(element.duration.text);
              const expectedTimeMin = parseTimeToSeconds(expected[rowIndex][colIndex].duration.min);
              const expectedTimeMax = parseTimeToSeconds(expected[rowIndex][colIndex].duration.max);
              expect(isWithinRange(actualDistance, expectedDistanceMin, expectedDistanceMax)).toBe(true);
              expect(isWithinRange(actualTime, expectedTimeMin, expectedTimeMax)).toBe(true);
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
