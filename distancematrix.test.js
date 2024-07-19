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
    "id": "CT01",
    "origins": ["rio de janeiro"],
    "destinations": ["são paulo"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "430km", "max": "450km" },
        "duration": { "min": "5h 15mins", "max": "5h 45mins" }
      }
    ]
  },
  {
    "id": "CT02",
    "origins": [""],
    "destinations": ["são paulo"],
    "apiKey": "chave válida em string",
    "expected": ["requisição inválida"]
  },
  {
    "id": "CT03",
    "origins": ["rio de janeiro", "varginha,minas gerais"],
    "destinations": ["são paulo"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "430km", "max": "450km" },
        "duration": { "min": "5h 15mins", "max": "5h 45mins" }
      },
      {
        "distance": { "min": "305km", "max": "325km" },
        "duration": { "min": "4h", "max": "4h 30mins" }
      }
    ]
  },
  {
    "id": "CT04",
    "origins": ["são paulo"],
    "destinations": [""],
    "apiKey": "chave válida em string",
    "expected": ["requisição inválida"]
  },
  {
    "id": "CT05",
    "origins": ["são paulo"],
    "destinations": ["rio de janeiro", "varginha,minas gerais"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "430km", "max": "450km" },
        "duration": { "min": "5h 15mins", "max": "5h 45mins" }
      },
      {
        "distance": { "min": "305km", "max": "325km" },
        "duration": { "min": "4h", "max": "4h 30mins" }
      }
    ]
  },
  {
    "id": "CT06",
    "origins": ["rio de janeiro"],
    "destinations": ["são paulo"],
    "apiKey": "",
    "expected": ["requisição negada"]
  },
  {
    "id": "CT07",
    "origins": ["rio de janeiro"],
    "destinations": ["são paulo"],
    "apiKey": ["chave válida em string", "chave válida em string"],
    "expected": ["requisição negada"]
  },
  {
    "id": "CT08",
    "origins": ["23525020"],
    "destinations": ["são paulo"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "410km", "max": "430km" },
        "duration": { "min": "5h", "max": "5h 30mins" }
      }
    ]
  },
  {
    "id": "CT09",
    "origins": ["abc"],
    "destinations": ["são paulo"],
    "apiKey": "chave válida em string",
    "expected": ["resultado não encontrado"]
  },
  {
    "id": "CT10",
    "origins": ["999999999999"],
    "destinations": ["são paulo"],
    "apiKey": "chave válida em string",
    "expected": ["resultado não encontrado"]
  },
  {
    "id": "CT11",
    "origins": [null],
    "destinations": ["são paulo"],
    "apiKey": "chave válida em string",
    "expected": ["requisição inválida"]
  },
  {
    "id": "CT12",
    "origins": ["Não string, não integer, não null"],
    "destinations": ["são paulo"],
    "apiKey": "chave válida em string",
    "expected": ["resultado não encontrado"]
  },
  {
    "id": "CT13",
    "origins": ["são paulo"],
    "destinations": ["23525020"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "410km", "max": "430km" },
        "duration": { "min": "5h", "max": "5h 30mins" }
      }
    ]
  },
  {
    "id": "CT14",
    "origins": ["são paulo"],
    "destinations": ["abc"],
    "apiKey": "chave válida em string",
    "expected": ["resultado não encontrado"]
  },
  {
    "id": "CT15",
    "origins": ["são paulo"],
    "destinations": ["999999999999"],
    "apiKey": "chave válida em string",
    "expected": ["resultado não encontrado"]
  },
  {
    "id": "CT16",
    "origins": ["são paulo"],
    "destinations": [null],
    "apiKey": "chave válida em string",
    "expected": ["requisição inválida"]
  },
  {
    "id": "CT17",
    "origins": ["são paulo"],
    "destinations": ["Não string, não integer, não null"],
    "apiKey": "chave válida em string",
    "expected": ["resultado não encontrado"]
  },
  {
    "id": "CT18",
    "origins": ["rio de janeiro"],
    "destinations": ["são paulo"],
    "apiKey": "chave válida convertida para integer",
    "expected": ["requisição negada"]
  },
  {
    "id": "CT19",
    "origins": ["rio de janeiro"],
    "destinations": ["são paulo"],
    "apiKey": null,
    "expected": ["requisição negada"]
  },
  {
    "id": "CT20",
    "origins": ["rio de janeiro"],
    "destinations": ["são paulo"],
    "apiKey": "chave inválida",
    "expected": ["requisição negada"]
  },
  {
    "id": "CT21",
    "origins": ["rio de janeiro"],
    "destinations": ["rio de janeiro"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "1m", "max": "1m" },
        "duration": { "min": "1m", "max": "1m" }
      }
    ]
  },
  {
    "id": "CT22",
    "origins": [""],
    "destinations": [""],
    "apiKey": "chave válida em string",
    "expected": ["requisição inválida"]
  },
  {
    "id": "CT23",
    "origins": ["-22.942631", "-43.683310"],
    "destinations": ["-22.900371528558335", "-43.676330076152006"],
    "apiKey": "chave válida em string",
    "expected": ["resultado não encontrado"]
  },
  {
    "id": "CT24",
    "origins": ["-22.942631, -43.683310"],
    "destinations": ["-22.900371528558335, -43.676330076152006"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "6km", "max": "7km" },
        "duration": { "min": "8m", "max": "28m" }
      }
    ]
  },
  {
    "id": "CT25",
    "origins": ["kyoto, japão"],
    "destinations": ["Santa cruz,rj"],
    "apiKey": "chave válida em string",
    "expected": ["resultado não encontrado"]
  },
  {
    "id": "CT26",
    "origins": ["nova iorque, EUA"],
    "destinations": ["Santa cruz,rj"],
    "apiKey": "chave válida em string",
    "expected": ["resultado não encontrado"]
  },
  {
    "id": "CT27",
    "origins": ["mexico"],
    "destinations": ["Santa cruz,rj"],
    "apiKey": "chave válida em string",
    "expected": ["resultado não encontrado"]
  },
  {
    "id": "CT28",
    "origins": ["Cidade do México, distrito federal"],
    "destinations": ["Santa cruz,rj"],
    "apiKey": "chave válida em string",
    "expected": ["resultado não encontrado"]
  },
  {
    "id": "CT29",
    "origins": ["Cidade do México, distrito federal"],
    "destinations": ["Tepeji del Río de Ocampo"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "75km", "max": "85km" },
        "duration": { "min": "1h 10m", "max": "1h 30m" }
      }
    ]
  },
  {
    "id": "CT30",
    "origins": ["23525020"],
    "destinations": ["30110001"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "462km", "max": "482km" },
        "duration": { "min": "6h 39m", "max": "6h 59m" }
      }
    ]
  },
  {
    "id": "CT31",
    "origins": ["19000000"],
    "destinations": ["30110001"],
    "apiKey": "chave válida em string",
    "expected": ["resultado não encontrado"]
  },
  {
    "id": "CT32",
    "origins": ["50670000"],
    "destinations": ["30110001"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "2007km", "max": "2027km" },
        "duration": { "min": "1d 5h", "max": "1d 7h" }
      }
    ]
  },
  {
    "id": "CT33",
    "origins": ["50670000"],
    "destinations": ["23525020"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "2329km", "max": "2049km" },
        "duration": { "min": "1d 8h", "max": "1d 12h" }
      }
    ]
  },
  {
    "id": "CT34",
    "origins": ["Rua da Consolação, São Paulo, SP"],
    "destinations": ["Rua Augusta, São Paulo, SP"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "0.1km", "max": "1km" },
        "duration": { "min": "1m", "max": "10m" }
      }
    ]
  },
  {
    "id": "CT35",
    "origins": ["Avenida Brasil, Rio de Janeiro, RJ"],
    "destinations": ["Rua Voluntários da Pátria, Rio de Janeiro, RJ"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "33km", "max": "53km" },
        "duration": { "min": "30m", "max": "1h" }
      }
    ]
  },
  {
    "id": "CT36",
    "origins": ["Rua Sete de Setembro, Belo Horizonte, MG"],
    "destinations": ["Avenida Afonso Pena, Belo Horizonte, MG"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "10km", "max": "20km" },
        "duration": { "min": "15m", "max": "45m" }
      }
    ]
  },
  {
    "id": "CT37",
    "origins": ["Rua XV de Novembro, Curitiba, PR"],
    "destinations": ["Avenida Marechal Deodoro, Curitiba, PR"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "1km", "max": "5km" },
        "duration": { "min": "3m", "max": "13m" }
      }
    ]
  },
  {
    "id": "CT38",
    "origins": ["Rua dos Andradas, Porto Alegre, RS"],
    "destinations": ["Avenida Borges de Medeiros, Porto Alegre, RS"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "1km", "max": "6km" },
        "duration": { "min": "5m", "max": "15m" }
      }
    ]
  },
  {
    "id": "CT39",
    "origins": ["Rua Frei Caneca, Recife, PE"],
    "destinations": ["Avenida Boa Viagem, Recife, PE"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "5km", "max": "10km" },
        "duration": { "min": "10m", "max": "20m" }
      }
    ]
  },
  {
    "id": "CT40",
    "origins": ["Rua Amazonas, Manaus, AM"],
    "destinations": ["Avenida Djalma Batista, Manaus, AM"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "2km", "max": "7km" },
        "duration": { "min": "3m", "max": "15m" }
      }
    ]
  },
  {
    "id": "CT41",
    "origins": ["Rua Sete de Abril, Salvador, BA"],
    "destinations": ["Avenida Sete de Setembro, Salvador, BA"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "5km", "max": "15km" },
        "duration": { "min": "7m", "max": "27m" }
      }
    ]
  },
  {
    "id": "CT42",
    "origins": ["Rua das Flores, Fortaleza, CE"],
    "destinations": ["Avenida Beira Mar, Fortaleza, CE"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "2km", "max": "12km" },
        "duration": { "min": "9m", "max": "29m" }
      }
    ]
  },
  {
    "id": "CT43",
    "origins": ["Rua dos Andradas, Florianópolis, SC"],
    "destinations": ["Avenida Rio Branco, Florianópolis, SC"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "3km", "max": "15km" },
        "duration": { "min": "3m", "max": "23m" }
      }
    ]
  },
  {
    "id": "CT44",
    "origins": ["Rua Dom Pedro II, Goiânia, GO"],
    "destinations": ["Avenida Anhanguera, Goiânia, GO"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "3km", "max": "15km" },
        "duration": { "min": "6m", "max": "26m" }
      }
    ]
  },
  {
    "id": "CT45",
    "origins": ["Rua General Osório, Belém, PA"],
    "destinations": ["Avenida Almirante Barroso, Belém, PA"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "1km", "max": "9km" },
        "duration": { "min": "2m", "max": "22m" }
      }
    ]
  },
  {
    "id": "CT46",
    "origins": ["Rua Quinze de Novembro, Vitória, ES"],
    "destinations": ["Avenida Jerônimo Monteiro, Vitória, ES"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "0.5km", "max": "2km" },
        "duration": { "min": "1m", "max": "5m" }
      }
    ]
  },
  {
    "id": "CT47",
    "origins": ["Rua João Pessoa, João Pessoa, PB"],
    "destinations": ["Avenida Epitácio Pessoa, João Pessoa, PB"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "0.4km", "max": "1.9km" },
        "duration": { "min": "1m", "max": "5m" }
      }
    ]
  },
  {
    "id": "CT48",
    "origins": ["Rua Marechal Deodoro, Campo Grande, MS"],
    "destinations": ["Avenida Afonso Pena, Campo Grande, MS"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "5km", "max": "15km" },
        "duration": { "min": "12m", "max": "32m" }
      }
    ]
  },
  {
    "id": "CT49",
    "origins": ["Rua Mato Grosso, Cuiabá, MT"],
    "destinations": ["Avenida Rubens de Mendonça, Cuiabá, MT"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "3km", "max": "9km" },
        "duration": { "min": "3m", "max": "23m" }
      }
    ]
  },
  {
    "id": "CT50",
    "origins": ["Rua Sergipe, Aracaju, SE"],
    "destinations": ["Avenida Beira Mar, Aracaju, SE"],
    "apiKey": "chave válida em string",
    "expected": [
      {
        "distance": { "min": "3km", "max": "9km" },
        "duration": { "min": "5m", "max": "25m" }
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
