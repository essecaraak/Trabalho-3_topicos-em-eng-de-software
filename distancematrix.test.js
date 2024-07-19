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
      id: "CT01",
      origins: ["rio de janeiro"],
      destinations: ["são paulo"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "430 km", max: "450 km" },
          duration: { min: "5h 15m", max: "5h 45m" }
        }
      ]
    },
    {
      id: "CT02",
      origins: [""],
      destinations: ["são paulo"],
      apiKey: "chave válida em string",
      expected: ["requisição inválida"]
    },
    {
      id: "CT03",
      origins: ["rio de janeiro", "varginha, minas gerais"],
      destinations: ["são paulo"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "430 km", max: "450 km" },
          duration: { min: "5h 15m", max: "5h 45m" }
        },
        {
          distance: { min: "305 km", max: "325 km" },
          duration: { min: "4h", max: "4h 30m" }
        }
      ]
    },
    {
      id: "CT04",
      origins: ["são paulo"],
      destinations: [""],
      apiKey: "chave válida em string",
      expected: ["requisição inválida"]
    },
    {
      id: "CT05",
      origins: ["são paulo"],
      destinations: ["rio de janeiro", "varginha, minas gerais"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "430 km", max: "450 km" },
          duration: { min: "5h 15m", max: "5h 45m" }
        },
        {
          distance: { min: "305 km", max: "325 km" },
          duration: { min: "4h", max: "4h 30m" }
        }
      ]
    },
    {
      id: "CT06",
      origins: ["rio de janeiro"],
      destinations: ["são paulo"],
      apiKey: "",
      expected: ["requisição negada"]
    },
    {
      id: "CT07",
      origins: ["rio de janeiro"],
      destinations: ["são paulo"],
      apiKey: ["chave válida em string", "chave válida em string"],
      expected: ["requisição negada"]
    },
    {
      id: "CT08",
      origins: ["23525020"],
      destinations: ["são paulo"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "410 km", max: "430 km" },
          duration: { min: "5h", max: "5h 30m" }
        }
      ]
    },
    {
      id: "CT09",
      origins: ["abc"],
      destinations: ["são paulo"],
      apiKey: "chave válida em string",
      expected: ["resultado não encontrado"]
    },
    {
      id: "CT10",
      origins: ["999999999999"],
      destinations: ["são paulo"],
      apiKey: "chave válida em string",
      expected: ["resultado não encontrado"]
    },
    {
      id: "CT11",
      origins: [null],
      destinations: ["são paulo"],
      apiKey: "chave válida em string",
      expected: ["requisição inválida"]
    },
    {
      id: "CT12",
      origins: ["Não string, não integer, não null"],
      destinations: ["são paulo"],
      apiKey: "chave válida em string",
      expected: ["resultado não encontrado"]
    },
    {
      id: "CT13",
      origins: ["são paulo"],
      destinations: ["23525020"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "410 km", max: "430 km" },
          duration: { min: "5h", max: "5h 30m" }
        }
      ]
    },
    {
      id: "CT14",
      origins: ["são paulo"],
      destinations: ["abc"],
      apiKey: "chave válida em string",
      expected: ["resultado não encontrado"]
    },
    {
      id: "CT15",
      origins: ["são paulo"],
      destinations: ["999999999999"],
      apiKey: "chave válida em string",
      expected: ["resultado não encontrado"]
    },
    {
      id: "CT16",
      origins: ["são paulo"],
      destinations: [null],
      apiKey: "chave válida em string",
      expected: ["requisição inválida"]
    },
    {
      id: "CT17",
      origins: ["são paulo"],
      destinations: ["Não string, não integer, não null"],
      apiKey: "chave válida em string",
      expected: ["resultado não encontrado"]
    },
    {
      id: "CT18",
      origins: ["rio de janeiro"],
      destinations: ["são paulo"],
      apiKey: "chave válida convertida para integer",
      expected: ["requisição negada"]
    },
    {
      id: "CT19",
      origins: ["rio de janeiro"],
      destinations: ["são paulo"],
      apiKey: null,
      expected: ["requisição negada"]
    },
    {
      id: "CT20",
      origins: ["rio de janeiro"],
      destinations: ["são paulo"],
      apiKey: "chave inválida",
      expected: ["requisição negada"]
    },
    {
      id: "CT21",
      origins: ["rio de janeiro"],
      destinations: ["rio de janeiro"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "1 m", max: "1 m" },
          duration: { min: "1 m", max: "1 m" }
        }
      ]
    },
    {
      id: "CT22",
      origins: [""],
      destinations: [""],
      apiKey: "chave válida em string",
      expected: ["requisição inválida"]
    },
    {
      id: "CT23",
      origins: ["-22.942631", "-43.683310"],
      destinations: ["-22.900371528558335", "-43.676330076152006"],
      apiKey: "chave válida em string",
      expected: ["resultado não encontrado"]
    },
    {
      id: "CT24",
      origins: ["-22.942631, -43.683310"],
      destinations: ["-22.900371528558335, -43.676330076152006"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "6 km", max: "7 km" },
          duration: { min: "8 m", max: "28 m" }
        }
      ]
    },
    {
      id: "CT25",
      origins: ["kyoto, japão"],
      destinations: ["Santa cruz, rj"],
      apiKey: "chave válida em string",
      expected: ["resultado não encontrado"]
    },
    {
      id: "CT26",
      origins: ["nova iorque, EUA"],
      destinations: ["Santa cruz, rj"],
      apiKey: "chave válida em string",
      expected: ["resultado não encontrado"]
    },
    {
      id: "CT27",
      origins: ["mexico"],
      destinations: ["Santa cruz, rj"],
      apiKey: "chave válida em string",
      expected: ["resultado não encontrado"]
    },
    {
      id: "CT28",
      origins: ["Cidade do México, distrito federal"],
      destinations: ["Santa cruz, rj"],
      apiKey: "chave válida em string",
      expected: ["resultado não encontrado"]
    },
    {
      id: "CT29",
      origins: ["Cidade do México, distrito federal"],
      destinations: ["Tepeji del Río de Ocampo"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "75 km", max: "85 km" },
          duration: { min: "1h 10m", max: "1h 30m" }
        }
      ]
    },
    {
      id: "CT30",
      origins: ["23525020"],
      destinations: ["30110001"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "462 km", max: "482 km" },
          duration: { min: "6h 39m", max: "6h 59m" }
        }
      ]
    },
    {
      id: "CT31",
      origins: ["19000000"],
      destinations: ["30110001"],
      apiKey: "chave válida em string",
      expected: ["resultado não encontrado"]
    },
    {
      id: "CT32",
      origins: ["50670000"],
      destinations: ["30110001"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "2007 km", max: "2027 km" },
          duration: { min: "24h 27m", max: "24h 47m" }
        }
      ]
    },
    {
      id: "CT33",
      origins: ["15 5647-921"],
      destinations: ["24 5647-927"],
      apiKey: "chave válida em string",
      expected: ["resultado não encontrado"]
    },
    {
      id: "CT34",
      origins: ["15 5647-921"],
      destinations: ["15 5647-927"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "5 km", max: "7 km" },
          duration: { min: "10 m", max: "15 m" }
        }
      ]
    },
    {
      id: "CT35",
      origins: ["15 5647-921"],
      destinations: ["15 5647-929"],
      apiKey: "chave válida em string",
      expected: ["resultado não encontrado"]
    },
    {
      id: "CT36",
      origins: ["15 5647-929"],
      destinations: ["15 5647-921"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "5 km", max: "7 km" },
          duration: { min: "10 m", max: "15 m" }
        }
      ]
    },
    {
      id: "CT37",
      origins: ["23.5489", "-46.6388"],
      destinations: ["-22.9068", "-43.1729"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "430 km", max: "450 km" },
          duration: { min: "5h 15m", max: "5h 45m" }
        }
      ]
    },
    {
      id: "CT38",
      origins: ["40.7128", "-74.0060"],
      destinations: ["34.0522", "-118.2437"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "3935 km", max: "3955 km" },
          duration: { min: "37h", max: "39h" }
        }
      ]
    },
    {
      id: "CT39",
      origins: ["-23.5505", "-46.6333"],
      destinations: ["-22.9068", "-43.1729"],
      apiKey: "chave inválida",
      expected: ["requisição negada"]
    },
    {
      id: "CT40",
      origins: ["-23.5505", "-46.6333"],
      destinations: ["-22.9068", "-43.1729"],
      apiKey: "",
      expected: ["requisição negada"]
    },
    {
      id: "CT41",
      origins: ["-23.5505", "-46.6333"],
      destinations: ["-22.9068", "-43.1729"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "430 km", max: "450 km" },
          duration: { min: "5h 15m", max: "5h 45m" }
        }
      ]
    },
    {
      id: "CT42",
      origins: ["-23.5505", "-46.6333"],
      destinations: ["-22.9068", "-43.1729"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "430 km", max: "450 km" },
          duration: { min: "5h 15m", max: "5h 45m" }
        }
      ]
    },
    {
      id: "CT43",
      origins: ["-23.5505", "-46.6333"],
      destinations: ["-22.9068", "-43.1729"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "430 km", max: "450 km" },
          duration: { min: "5h 15m", max: "5h 45m" }
        }
      ]
    },
    {
      id: "CT44",
      origins: ["-23.5505", "-46.6333"],
      destinations: ["-22.9068", "-43.1729"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "430 km", max: "450 km" },
          duration: { min: "5h 15m", max: "5h 45m" }
        }
      ]
    },
    {
      id: "CT45",
      origins: ["-23.5505", "-46.6333"],
      destinations: ["-22.9068", "-43.1729"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "430 km", max: "450 km" },
          duration: { min: "5h 15m", max: "5h 45m" }
        }
      ]
    },
    {
      id: "CT46",
      origins: ["-23.5505", "-46.6333"],
      destinations: ["-22.9068", "-43.1729"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "430 km", max: "450 km" },
          duration: { min: "5h 15m", max: "5h 45m" }
        }
      ]
    },
    {
      id: "CT47",
      origins: ["-23.5505", "-46.6333"],
      destinations: ["-22.9068", "-43.1729"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "430 km", max: "450 km" },
          duration: { min: "5h 15m", max: "5h 45m" }
        }
      ]
    },
    {
      id: "CT48",
      origins: ["-23.5505", "-46.6333"],
      destinations: ["-22.9068", "-43.1729"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "430 km", max: "450 km" },
          duration: { min: "5h 15m", max: "5h 45m" }
        }
      ]
    },
    {
      id: "CT49",
      origins: ["-23.5505", "-46.6333"],
      destinations: ["-22.9068", "-43.1729"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "430 km", max: "450 km" },
          duration: { min: "5h 15m", max: "5h 45m" }
        }
      ]
    },
    {
      id: "CT50",
      origins: ["-23.5505", "-46.6333"],
      destinations: ["-22.9068", "-43.1729"],
      apiKey: "chave válida em string",
      expected: [
        {
          distance: { min: "430 km", max: "450 km" },
          duration: { min: "5h 15m", max: "5h 45m" }
        }
      ]
    }
  ]
  

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
