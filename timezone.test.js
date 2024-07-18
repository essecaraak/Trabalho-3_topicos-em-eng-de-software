/*const { getTimeZone } = require('./timezone');
require('dotenv').config();

describe('Time Zone API Tests', () => {
  const validKey = process.env.apiKey; // Ensure .env file is configured with apiKey
  const invalidKey = "invalid";
  const intKey = parseInt(validKey);
  
  const testCases = [
    {
      id: 'CT01',
      location: '-22.942286783437957, -43.68523354052276',
      timestamp: "1721180285",
      apiKey: "validkey",
      expected: {
        timeZoneId: "America/Sao_Paulo",
        timeZoneName: "Brasilia Standard Time"
      }
    },
    {
      id: 'CT02',
      location: '-22.942286783437957, -43.68523354052276',
      timestamp: null,
      apiKey: "validkey",
      expected: {
        status: "INVALID_REQUEST"
      }
    },
    {
      id: 'CT03',
      location: "-22.942286783437957, -43.68523354052276",
      timestamp: ["1721180285","1721180285"],
      apiKey: "validkey",
      expected: {
        status: "INVALID_REQUEST"
      }
    },
    {
      id: 'CT04',
      location: null,
      timestamp: "1721180285",
      apiKey: "validkey",
      expected: {
        status: "INVALID_REQUEST"
      }
    },
    {
      id: 'CT05',
      location: ["-22.942286783437957, -43.68523354052276","-22.942286783437957, -43.68523354052276"],
      timestamp: "1721180285",
      apiKey: "validkey",
      expected: {
        status: "INVALID_REQUEST"
      }
    },
    {
      id: 'CT06',
      location: '-22.942286783437957, -43.68523354052276',
      timestamp: "1721180285",
      apiKey: null,
      expected: {
        status: "REQUEST_DENIED"
      }
    },
    {
      id: 'CT07',
      location: '-22.942286783437957, -43.68523354052276',
      timestamp: "1721180285",
      apiKey: "doublekey",
      expected: {
        status: "REQUEST_DENIED"
      }
    },
    {
      id: 'CT08',
      location: '-22.942286783437957, -43.68523354052276',
      timestamp: 1721180285,
      apiKey: 'validkey',
      expected: {
        timeZoneId: "America/Sao_Paulo",
        timeZoneName: "Brasilia Standard Time"
      }
    },
    {
      id: 'CT09',
      location: "-22.942286783437957, -43.68523354052276",
      timestamp: 'abc',
      apiKey: "validkey",
      expected: {
        status: "INVALID_REQUEST"
      }
    },
    {
      id: 'CT10',
      location: "-22.942286783437957, -43.68523354052276",
      timestamp: 999999999999999999,
      apiKey: "validkey",
      expected: {
        status: "INVALID_REQUEST"
      }
    },
    {
      id: 'CT11',
      location: "-22.942286783437957, -43.68523354052276",
      timestamp: null,
      apiKey: "validkey",
      expected: {
        status: "INVALID_REQUEST"
      }
    },
    {
      id: 'CT12',
      location: "-22.942286783437957, -43.68523354052276",
      timestamp: function any(){},
      apiKey: "validkey",
      expected: {
        status: "INVALID_REQUEST"
      }
    },
    {
      id: 'CT13',
      location: [-22.942286783437957, -43.68523354052276],
    timestamp: "1721180285",
      apiKey: "validkey",
      expected: {
        status: "INVALID_REQUEST"
      }
    },
    {
      id: 'CT14',
      location: 'abc',
    timestamp: "1721180285",
      timestamp: "",
      apiKey: "validkey",
      expected: {
        status: "INVALID_REQUEST"
      }
    },
    {
      id: 'CT15',
      location: null,
      timestamp: "1721180285",
      apiKey: "validkey",
      expected: {
        status: "INVALID_REQUEST"
      }
    },
    {
      id: 'CT16',
      location: function any(){},
      timestamp: "1721180285",
      apiKey: "validkey",
      expected: {
        status: "INVALID_REQUEST"
      }
    },
    {
      id: 'CT17',
      location: '-22.942286783437957, -43.68523354052276',
    timestamp: "1721180285",
      apiKey: "integerkey",
      expected: {
        status: "REQUEST_DENIED"
      }
    },
    {
      id: 'CT18',
      location: '-22.942286783437957, -43.68523354052276',
      timestamp: "1721180285",
      apiKey: null,
      expected: {
        status: "REQUEST_DENIED"
      }
    },
    {
      id: 'CT19',
      location: '-22.942286783437957, -43.68523354052276',
      timestamp: "1721180285",
      apiKey: "invalidkey",
      expected: {
        status: "REQUEST_DENIED"
      }
    },
    {
      id: 'CT20',
      location: "34.052235, -118.243683",
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "America/Los_Angeles",
        timeZoneName: "Pacific Daylight Time"
      }
    },
    {
      id: 'CT21',
      location: "40.712776, -74.005974",
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "America/New_York",
        timeZoneName: "Eastern Daylight Time"
      }
    },
    {
      id: 'CT22',
      location: "48.856613, 2.352222",
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "Europe/Paris",
        timeZoneName: "Central European Summer Time"
      }
    },
    {
      id: 'CT23',
      location: "51.507351, -0.127758",
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "Europe/London",
        timeZoneName: "British Summer Time"
      }
    },
    {
      id: 'CT24',
      location: "35.689487, 139.691711",
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "Asia/Tokyo",
        timeZoneName: "Japan Standard Time"
      }
    },
    {
      id: 'CT25',
      location: "37.774929, -122.419418",
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "America/Los_Angeles",
        timeZoneName: "Pacific Daylight Time"
      }
    },
    {
      id: 'CT26',
      location: "-33.868820, 151.209290",
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "Australia/Sydney",
        timeZoneName: "Australian Eastern Standard Time"
      }
    },
    {
      id: 'CT27',
      location: "-34.603722, -58.381592",
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "America/Buenos_Aires",
        timeZoneName: "Argentina Standard Time"
      }
    },
    {
      id: 'CT28',
      location: "55.755825, 37.617298",
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "Europe/Moscow",
        timeZoneName: "Moscow Standard Time"
      }
    },
    {
      id: 'CT29',
      location: "-22.471447135144732, -43.493599513616864",
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "America/Sao_Paulo",
        timeZoneName: "Brasilia Standard Time"
      }
    },
    {
      id: 'CT30',
      location: '-9.399157848073202, -69.66215878124639',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "America/Rio_Branco",
        timeZoneName: "Acre Standard Time"
      }
    },
    {
      id: 'CT31',
      location: '-14.55407092440772, -63.691311587506576',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "America/La_Paz",
        timeZoneName: "Bolivia Time"
      }
    },
    {
      id: 'CT32',
      location: '-74.62023171468688, 49.3841756045618',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "Pacific/Auckland",
        timeZoneName: "New Zealand Standard Time"
      }
    },
    {
      id: 'CT33',
      location: '-25.90201107887579, 124.9701145841462',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "Australia/Perth",
        timeZoneName: "Australian Western Standard Time"
      }
    },
    {
      id: 'CT34',
      location: '71.82085834388279, 97.54823904736676',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "Asia/Krasnoyarsk",
        timeZoneName: "Krasnoyarsk Standard Time"
      }
    },
    {
      id: 'CT35',
      location: '-75.25956732129733, -15.303325661687184',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "Pacific/Auckland",
        timeZoneName: "New Zealand Standard Time"
      }
    },
    {
      id: 'CT36',
      location: '78.5131710173079, -40.26426136554049',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "America/Godthab",
        timeZoneName: "Greenland Summer Time"
      }
    },
    {
      id: 'CT37',
      location: '48.856613, 2.352222',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "Europe/Paris",
        timeZoneName: "Central European Summer Time"
      }
    },
    {
      id: 'CT38',
      location: '35.689487, 139.691711',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "Asia/Tokyo",
        timeZoneName: "Japan Standard Time"
      }
    },
    {
      id: 'CT39',
      location: '55.74151473897761, -105.12754487079425',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "America/Regina",
        timeZoneName: "Central Standard Time"
      }
    },
    {
      id: 'CT40',
      location: '18.920097042452348, -70.85020162886876',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "America/Santo_Domingo",
        timeZoneName: "Atlantic Standard Time"
      }
    },
    {
      id: 'CT41',
      location: '6.602719365092612, -64.8736392174561',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "America/Caracas",
        timeZoneName: "Venezuela Time"
      }
    },
    {
      id: 'CT42',
      location: '26.06002793152214, -100.02988869635406',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "America/Monterrey",
        timeZoneName: "Central Standard Time"
      }
    },
    {
      id: 'CT43',
      location: '18.753730458592216, -70.85020162886876',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "America/Santo_Domingo",
        timeZoneName: "Atlantic Standard Time"
      }
    },
    {
      id: 'CT44',
      location: '-54.54431904950955, -36.319662058725804',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "Atlantic/South_Georgia",
        timeZoneName: "South Georgia Time"
      }
    },
    {
      id: 'CT45',
      location: '-51.60749642203397, -58.68570110423315',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "Atlantic/Stanley",
        timeZoneName: "Falkland Islands Standard Time"
      }
    },
    {
      id: 'CT46',
      location: '-49.34279534827178, 69.28314371643293',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "Indian/Kerguelen",
        timeZoneName: "French Southern & Antarctic Time"
      }
    },
    {
      id: 'CT47',
      location: '-8.522102293288357, 179.19904617208462',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "Pacific/Funafuti",
        timeZoneName: "Tuvalu Time"
      }
    },
    {
      id: 'CT48',
      location: '-7.944676463174948, -14.392029979323045',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "Atlantic/St_Helena",
        timeZoneName: "Greenwich Mean Time"
      }
    },
    {
      id: 'CT49',
      location: '-37.08301651731309, -12.313531371091893',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "Atlantic/St_Helena",
        timeZoneName: "Greenwich Mean Time"
      }
    },
    {
      id: 'CT50',
      location: '-22.39156974250469, -44.02619514580996',
      timestamp: 1721180285,
      apiKey: "validkey",
      expected: {
        timeZoneId: "America/Sao_Paulo",
        timeZoneName: "Brasilia Standard Time"
      }
    }
  ];

  testCases.forEach(({ id, location, timestamp, apiKey, expected }) => {
    test(`${id} - Testing Time Zone API`, async () => {
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
        
        const data = await getTimeZone(location, timestamp, apiKeyToUse);
        
        if (expected.status) {
          expect(data.status).toBe(expected.status);
        } else {
          expect(data.timeZoneId).toBe(expected.timeZoneId);
          expect(data.timeZoneName).toBe(expected.timeZoneName);
        }
      } catch (error) {
        if (expected.status) {
          expect(error.response.data.status).toBe(expected.status);
        } else {
          throw error; 
        }
      }
    });
  });
});
*/