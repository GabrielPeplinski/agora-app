import cep from 'cep-promise';

interface CepPromiseInterface {
  cep: string,
  city: string,
  neighborhood: string,
  service: string,
  state: string,
  street: string
}

class CepService {
  static async searchCep(zipCode: string): Promise<CepPromiseInterface> {
    try {
      let data = await cep(zipCode, {
        timeout: 500,
      });

      return {
        cep: data.cep,
        city: data.city,
        neighborhood: data.neighborhood,
        service: data.service,
        state: data.state,
        street: data.street,
      };

    } catch (error) {
      console.error(`Error searching CEP: ${(error as Error).message}`);
      throw error;
    }
  }
}

export default CepService;
