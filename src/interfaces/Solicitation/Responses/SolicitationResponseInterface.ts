interface SolicitationResponseInterface {
  id: number,
  title: string;
  description: string;
  latitudeCoordinates: string;
  longitudeCoordinates: string;
  solicitationCategoryId: number;
  likesCount: number;
  coverImage?: string | null;
  images?: string[] | null;
}

export default SolicitationResponseInterface;