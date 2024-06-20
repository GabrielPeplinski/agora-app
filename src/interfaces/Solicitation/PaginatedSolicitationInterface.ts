interface PaginatedSolicitationInterface {
  id: number;
  title: string;
  likesCount: number;
  coverImage: string | null;
  hasCurrentUserLike: boolean;
  createdAt: string;
  updatedAt: string;
}

export default PaginatedSolicitationInterface;