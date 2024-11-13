interface UpdateSolicitationFormDataInterface {
  title: string;
  description: string;
  solicitationCategoryId: number;
  latitudeCoordinates: string;
  longitudeCoordinates: string;
  coverImage: string | null;
  images: string[];
  newImages: string[];
  imagesToDelete: string[];
}

export default UpdateSolicitationFormDataInterface;