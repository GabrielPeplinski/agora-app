interface SolicitationInterface {
  id?: number | null;
  title: string;
  description: string;
  latitudeCoordinates: string;
  longitudeCoordinates: string;
  solicitationCategoryId: number;
  likesCount?: number | null;
  coverImage?: string | null;
  images?: string[] | null;
}

export default SolicitationInterface;