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
      const response = await cep(zipCode, {
        timeout: 500,
      });

      return {
        cep: response.cep,
        city: response.city,
        neighborhood: response.neighborhood,
        service: response.service,
        state: response.state,
        street: response.street,
      };

    } catch (error) {
      console.error(`Error searching CEP: ${(error as Error).message}`);
      throw error;
    }
  }
}

export default CepService;
