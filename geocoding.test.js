/*const { getGeocoding, getGeocode } = require('./geocoding');
require('dotenv').config();

describe('Geocoding API Tests', () => {
  const validKey = process.env.apikey; // Insira sua chave de API válida aqui
  const invalidKey = 'invalid_key';
  const intKey = parseInt(validKey);
  const testCases = [
    { id: 'CT01', 
      input: 'santa cruz, rio de janeiro', 
      apiKey: 'validKey', 
      expected: { lat: -22.9208226, lng: -43.6809034} },
   { id: 'CT02', 
      input: null, 
      apiKey: 'validKey', 
      expected: { status: 'INVALID_REQUEST'} },
    { id: 'CT03', 
      input: ['santa cruz, rio de janeiro','São paulo, SP'], 
      apiKey: 'validKey', 
      expected: { status: 'INVALID_REQUEST' } },
      { id: 'CT04', 
        input: 'santa cruz, rio de janeiro', 
        apiKey: null, 
        expected: { status: 'REQUEST_DENIED' } },
    { id: 'CT05', 
      input: 'santa cruz, rio de janeiro', 
      apiKey: "doublekey", 
      expected: { status: 'REQUEST_DENIED' } },
    { id: 'CT06', 
      input: '23525020', 
      apiKey: 'validKey', 
      expected: {formatted_address: "R. Montreal - Santa Cruz, Rio de Janeiro - RJ, 23525-020, Brazil" } },
    { id: 'CT07', 
      input: 'aaaaaa', 
      apiKey: 'validKey', 
      expected: { status: 'ZERO_RESULTS' } },
    { id: 'CT08', 
      input: '999999999', 
      apiKey: 'validKey', 
      expected: { status: 'ZERO_RESULTS' } },
    { id: 'CT09', 
      input: null, 
      apiKey: 'validKey', 
      expected: { status: 'INVALID_REQUEST' } },
    { id: 'CT10', 
      input: function any(){}, 
      apiKey: 'validKey', 
      expected: { status: 'ZERO_RESULTS' } },
    { id: 'CT11', 
      input: 'santa cruz, rio de janeiro', 
      apiKey: 'integerkey', 
      expected: { status: 'REQUEST_DENIED' } },
    { id: 'CT12', 
      input: 'santa cruz, rio de janeiro', 
      apiKey: null, 
      expected: { status: 'REQUEST_DENIED' } },
    { id: 'CT13', 
      input: 'santa cruz, rio de janeiro', 
      apiKey: 'invalidkey', 
      expected: { status: 'REQUEST_DENIED' } },
    
    // Casos de erro guessing
    { id: 'CT14', 
      input: '26291230', 
      apiKey: 'validKey', 
      expected: { formatted_address: "R. Agostinho Rodrigues da Silva - Cabuçu, Nova Iguaçu - RJ, 26291-230, Brazil" } },
    { id: 'CT15', 
      input: '20010000', 
      apiKey: 'validKey', 
      expected: { formatted_address: "R. Primeiro de Março - Centro, Rio de Janeiro - RJ, 20010-000, Brazil" } },
    { id: 'CT16', 
      input: '30110010', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Floresta, Belo Horizonte - State of Minas Gerais, 30110-010, Brazil" } },
    { id: 'CT17', 
      input: '70040010', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Brasília, Brasilia - Federal District, 70040-010, Brazil" } },
    { id: 'CT18', 
      input: '80010020', 
      apiKey: 'validKey', 
      expected: { formatted_address: "R. Pedro Ivo - Centro, Curitiba - PR, 80010-020, Brazil" } },
    { id: 'CT19', 
      input: '26261220', 
      apiKey: 'validKey', 
      expected: { formatted_address: "R. Ministro Lafaiete de Andrade - Luz, Nova Iguaçu - RJ, 26261-220, Brazil" } },
    { id: 'CT20', 
      input: '50010240', 
      apiKey: 'validKey', 
      expected: { formatted_address: "R. do Imperador Pedro II - Santo Antônio, Recife - PE, 50010-240, Brazil" } },
    { id: 'CT21', 
      input: '60010150', 
      apiKey: 'validKey', 
      expected: { formatted_address: "R. Abc - Moura Brasil, Fortaleza - CE, 60010-150, Brazil" } },
    { id: 'CT22', 
      input: '69010000', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Av. Eduardo Ribeiro, 301-631 - Centro, Manaus - AM, 69010-000, Brazil" } },
    { id: 'CT23', 
      input: '78010000', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Cuiabá, State of Mato Grosso, 78010-000, Brazil" } },
    { id: 'CT24', 
      input: '64000000', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Teresina - State of Piauí, 64000-000, Brazil" } },
    { id: 'CT25', 
      input: '49010390', 
      apiKey: 'validKey', 
      expected: { formatted_address: "R. Lagarto, 1-1356 - Centro, Aracaju - SE, 49010-390, Brazil" } },
    { id: 'CT26', 
      input: '57020000', 
      apiKey: 'validKey', 
      expected: { formatted_address: "R. do Comércio - Centro, Maceió - AL, 57020-000, Brazil" } },
    { id: 'CT27', 
      input: '66010000', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Av. Pres. Vargas, 1-380 - Campina, Belém - PA, 66010-000, Brazil" } },
    { id: 'CT28', 
      input: '77001006', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Q. 101 Norte Avenida Joaquim Teotônio Segurado - Plano Diretor Norte, Palmas - TO, 77001-006, Brazil" } },
    { id: 'CT29', 
      input: '29010130', 
      apiKey: 'validKey', 
      expected: { formatted_address: "R. Gonçalves Dias - Centro, Vitória - ES, 29010-130, Brazil" } },
    { id: 'CT30', 
      input: '90010110', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Av. Mauá, 1-1101 - Centro Histórico, Porto Alegre - RS, 90010-110, Brazil" } },
    { id: 'CT31', 
      input: '88010400', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Praça XV de Novembro - Centro, Florianópolis - SC, 88010-400, Brazil" } },
    { id: 'CT32', 
      input: '76801000', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Av. Pinheiro Machado, 2-550 - Centro, Porto Velho - RO, 76801-000, Brazil" } },
    { id: 'CT33', 
      input: '69301150', 
      apiKey: 'validKey', 
      expected: { formatted_address: "R. Cel. Pinto - Centro, Boa Vista - RR, 69301-150, Brazil" } },
    { id: 'CT34', 
      input: '58010000', 
      apiKey: 'validKey', 
      expected: { formatted_address: "João Pessoa - State of Paraíba, 58010-000, Brazil" } },
    { id: 'CT35', 
      input: '25550600', 
      apiKey: 'validKey', 
      expected: { formatted_address: "R. Ligação - Vilar Formoso, São João de Meriti - RJ, 25550-600, Brazil" } },
    { id: 'CT36', 
      input: '66055240', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Av. Generalíssimo Deodoro, 2-1226 - Umarizal, Belém - PA, 66055-240, Brazil" } },
    { id: 'CT37', 
      input: '69020060', 
      apiKey: 'validKey', 
      expected: { formatted_address: "R. Maj. Gabriel - Centro, Manaus - AM, 69020-060, Brazil" } },
    { id: 'CT38', 
      input: '23890000', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Seropédica - State of Rio de Janeiro, 23890-000, Brazil" } },
    { id: 'CT39', 
      input: '40285000', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Av. Dom João VI - Brotas, Salvador - BA, 40285-000, Brazil" } },
    { id: 'CT40', 
      input: '31515000', 
      apiKey: 'validKey', 
      expected: { formatted_address: "R. Padre Pedro Pinto, 1-509 - Venda Nova, Belo Horizonte - MG, 31515-000, Brazil" } },
    { id: 'CT41', 
      input: '20230014', 
      apiKey: 'validKey', 
      expected: { formatted_address: "R. Riachuelo, 2-184 - Centro, Rio de Janeiro - RJ, 20230-014, Brazil" } },
    { id: 'CT42', 
      input: '04870000', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Av. Pablo Neruda - Parque do Terceiro Lago, São Paulo - SP, 04870-000, Brazil" } },
    { id: 'CT43', 
      input: '30140002', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Av. Brasil, 1001-1349 - Funcionários, Belo Horizonte - MG, 30140-002, Brazil" } },
    { id: 'CT44', 
      input: '50670000', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Av. Caxangá, 3143-4117 - Iputinga, Recife - PE, 50670-000, Brazil" } },
    { id: 'CT45', 
      input: '60810050', 
      apiKey: 'validKey', 
      expected: { formatted_address: "R. Prof. Jacinto Botelho - Guararapes, Fortaleza - CE, 60810-050, Brazil" } },
    { id: 'CT46', 
      input: '60060270', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Rua Vinte e Três de Outubro - Praia de Iracema, Fortaleza - CE, 60060-270, Brazil" } },
    { id: 'CT47', 
      input: '58040000', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Av. Pres. Epitácio Pessoa, 2-1698 - Torre, João Pessoa - PB, 58040-000, Brazil" } },
    { id: 'CT48', 
      input: '38400702', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Av. Floriano Peixoto, 2024-3069 - Nossa Sra. Aparecida, Uberlândia - MG, 38400-702, Brazil" } },
    { id: 'CT49', 
      input: '26210210', 
      apiKey: 'validKey', 
      expected: { formatted_address: "Av. Gov. Roberto Silveira, 1-256 - Centro, Nova Iguaçu - RJ, 26210-210, Brazil" } },
    { id: 'CT50', 
      input: '19015050', 
      apiKey: 'validKey', 
      expected: { formatted_address: "R. José Dias Cintra - Vila Ocidental, Pres. Prudente - SP, 19015-050, Brazil" } },        
      
];


  testCases.forEach(({id,input,apiKey, expected}) => {
    test(`${id} - Testing Geocoding API`, async () => {
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
        const data = await getGeocode(input, apiKeyToUse);
        
        if(expected.location){
          await expect(data.results[0].geometry.location.lat).toBe(expected.lat);
          await expect(data.results[0].geometry.location.lng).toBe(expected.lng);
        }if(expected.formatted_address){
          await expect(data.results[0].formatted_address).toBe(expected.formatted_address);
        }if (expected.status) {
        
          await expect(data.status).toBe(expected.status);
        }
        
      } catch (error) {
        if (expected.error) {
          await expect(error).toBeDefined();
        } else {
          throw error;
        }
      }
    });
  });
});*/
