interface CreateSolicitationFormDataInterface {
  title: string;
  description: string;
  solicitationCategoryId: number;
  latitudeCoordinates: string;
  longitudeCoordinates: string;
  coverImage: string | null;
  images: string[];
}

export default CreateSolicitationFormDataInterface;