import cep from 'cep-promise';

export const searchCep = async (zipCode: string) => {
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
