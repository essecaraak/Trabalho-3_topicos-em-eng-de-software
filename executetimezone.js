require('dotenv').config();
const { getTimeZone } = require('./timezone');

const location = "-22.942286783437957, -43.68523354052276"; // Exemplo: coordenadas de Los Angeles
const timestamp = 1721180285//Math.floor(Date.now() / 1000); // Tempo atual em segundos desde 1970
const apikey = [process.env.apikey,process.env.apikey];
async function main() {
  try {
    const timeZoneData = await getTimeZone(location, timestamp,apikey);
    console.log('Informações do Fuso Horário:', JSON.stringify(timeZoneData, null, 2));
  } catch (error) {
    console.error('Erro ao obter informações do fuso horário:', error.message);
  }
}

main();
