import cep from 'cep-promise';

class CepService {
  static async searchCep(zipCode: string): Promise<AddressInterface> {
    try {
      const response = await cep(zipCode, {
        timeout: 500,
      });

      return {
        zipCode: response.cep,
        cityName: response.city,
        neighborhood: response.neighborhood,
        stateAbbreviation: response.state,
        street: response.street,
      };

    } catch (error) {
      console.error(`Error searching CEP: ${(error as Error).message}`);
      throw error;
    }
  }
}

export default CepService;
