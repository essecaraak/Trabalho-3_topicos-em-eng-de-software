require('dotenv').config();
const axios = require('axios');

async function getGeocode(address,apiKey) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json`;

  try {
    const response = await axios.get(url, {
      params: {
        address,
        key: apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao chamar a API Geocoding:', error);
    throw error;
  }
}

module.exports = { getGeocode };
