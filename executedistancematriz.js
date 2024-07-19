require('dotenv').config();
const { getDistanceMatrix } = require('./distanceMatrix');

const origins = ['Av. Gov. Paulo Barreto de Menezes, Aracaju - SE, Brazil', 'Rio de Janeiro, State of Rio de Janeiro, Brazil'];
const destinations = ['R. Sergipe - Siqueira Campos, Aracaju - SE, 49075-540, Brazil', 'São Paulo, State of São Paulo, Brazil'];
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
