require('dotenv').config();
const { getTimeZone } = require('./timezone');

const location = '34.0522,-118.2437'; // Exemplo: coordenadas de Los Angeles
const timestamp = Math.floor(Date.now() / 1000); // Tempo atual em segundos desde 1970

async function main() {
  try {
    const timeZoneData = await getTimeZone(location, timestamp);
    console.log('Informações do Fuso Horário:', JSON.stringify(timeZoneData, null, 2));
  } catch (error) {
    console.error('Erro ao obter informações do fuso horário:', error.message);
  }
}

main();
