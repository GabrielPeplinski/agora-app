interface PaginatedSolicitationInterface {
  id: number;
  title: string;
  likesCount: number;
  coverImage: string | null;
  hasCurrentUserLike: boolean;
  status: string;
  latitudeCoordinates: string;
  longitudeCoordinates: string;
  createdAt: string;
  updatedAt: string;
}

export default PaginatedSolicitationInterface;