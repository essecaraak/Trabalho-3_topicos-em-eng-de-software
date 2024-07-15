require('dotenv').config();
const axios = require('axios');

async function getDistanceMatrix(origins, destinations) {
  const apiKey = process.env.apiKey;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json`;

  try {
    const response = await axios.get(url, {
      params: {
        origins: origins.join('|'),
        destinations: destinations.join('|'),
        key: apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao chamar a API Distance Matrix:', error);
    throw error;
  }
}

module.exports = { getDistanceMatrix };
