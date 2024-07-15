require('dotenv').config();
const { getDistanceMatrix } = require('./distanceMatrix');

const origins = ['São Paulo,BR'];
const destinations = ['Brasília,BR'];

async function main() {
  try {
    const data = await getDistanceMatrix(origins, destinations);
    console.log('Distance Matrix Data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Erro ao obter dados da Distance Matrix:', error.message);
  }
}

main();
