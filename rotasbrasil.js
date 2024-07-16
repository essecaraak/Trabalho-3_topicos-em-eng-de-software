require('dotenv').config();
const axios = require('axios');

async function getRotaCoordenadas(coordenadas, veiculo = 'auto', eixo = 2, token) {
  const url = `https://rotasbrasil.com.br/apiRotas/coordenadas/`;

  try {
    const response = await axios.get(url, {
      params: {
        pontos: coordenadas,
        veiculo,
        eixo,
        token,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao chamar a API de Rotas Brasil:', error);
    throw error;
  }
}

async function getRotaEnderecos(cidades, veiculo = 'auto', eixo = 2, token) {
  const url = `https://rotasbrasil.com.br/apiRotas/enderecos/`;

  try {
    const response = await axios.get(url, {
      params: {
        pontos: cidades,
        veiculo,
        eixo,
        token,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao chamar a API de Rotas Brasil:', error);
    throw error;
  }
}

module.exports = { getRotaCoordenadas, getRotaEnderecos };
