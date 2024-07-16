require('dotenv').config();
const { getRotaCoordenadas, getRotaEnderecos } = require('./rotasbrasil');

async function main() {
  const coordenadas = '-46.6333824,-23.5506507;-49.2712724,-25.4295963';
  const cidades = 'São Paulo,SP;Curitiba,PR';
  const token = process.env.ROTAS_BRASIL_API_KEY;

  try {
    const rotaCoordenadas = await getRotaCoordenadas(coordenadas, 'caminhao', 2, token);
    console.log('Dados da Rota (Coordenadas):', JSON.stringify(rotaCoordenadas, null, 2));

    const rotaEnderecos = await getRotaEnderecos(cidades, 'caminhao', 2, token);
    console.log('Dados da Rota (Endereços):', JSON.stringify(rotaEnderecos, null, 2));
  } catch (error) {
    console.error('Erro ao obter dados da rota:', error.message);
  }
}

main();
