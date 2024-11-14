import axios from 'axios';

export const searchCep = async (cep: string): Promise<ViaCepResponseInterface> => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);

    if (response.data.erro) {
      throw new Error('CEP não encontrado');
    }

    return {
      cityName: response.data.localidade,
      neighborhood: response.data.bairro,
      stateAbbr: response.data.uf,
    };
  } catch (error) {
    throw new Error('Não foi possível buscar o CEP. Tente novamente!');
  }
};
