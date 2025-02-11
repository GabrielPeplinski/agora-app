interface UserSolicitationResponseInterface {
  id: number;
  performedBy: string;
  status: string;
  actionDescription: string;
  image: string | null;
  createdAt: string;
}

export default UserSolicitationResponseInterface;