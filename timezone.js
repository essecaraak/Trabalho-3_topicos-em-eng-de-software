require('dotenv').config();
const axios = require('axios');

async function getTimeZone(location, timestamp) {
  const apiKey = process.env.apiKey;
  const url = `https://maps.googleapis.com/maps/api/timezone/json`;

  try {
    const response = await axios.get(url, {
      params: {
        location,
        timestamp,
        key: apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao chamar a API Time Zone:', error);
    throw error;
  }
}

module.exports = { getTimeZone };
