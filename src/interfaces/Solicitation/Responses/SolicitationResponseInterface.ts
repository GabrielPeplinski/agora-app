import SolicitationStatusEnum from '@/src/enums/SolicitationStatusEnum';
import UserSolicitationResponseInterface from '@/src/interfaces/Solicitation/Responses/UserSolicitationInterface';

interface SolicitationCategoryResponseInterface {
  id: number;
  name: string;
  description: string;
}

interface SolicitationResponseInterface {
  id: number;
  title: string;
  description: string;
  latitudeCoordinates: string;
  longitudeCoordinates: string;
  solicitationCategoryId: number;
  likesCount: number;
  coverImage?: string | null;
  images?: string[] | null;
  status: SolicitationStatusEnum.OPEN | SolicitationStatusEnum.IN_PROGRESS | SolicitationStatusEnum.RESOLVED;
  solicitationCategory?: SolicitationCategoryResponseInterface | null;
  historic?: UserSolicitationResponseInterface[] | null;
  createdAt: string;
  updatedAt: string;
}

export default SolicitationResponseInterface;