require('dotenv').config();
const { getDistanceMatrix } = require('./distanceMatrix');

const origins = ["-23.5505", "-46.6333"];
const destinations = ["-22.9068", "-43.1729"];
const apikey = process.env.apikey;

async function main() {
  try {
    const data = await getDistanceMatrix(origins, destinations,apikey);
    console.log('Distance Matrix Data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Erro ao obter dados da Distance Matrix:', error.message);
  }
}

main();
