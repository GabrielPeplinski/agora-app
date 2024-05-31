import PaginatedSolicitationInterface from '@/src/interfaces/Solicitation/PaginatedSolicitationInterface';
import PaginationLinksInterface from '@/src/interfaces/Pagination/PaginationLinksInterface';
import PaginationMetaInterface from '@/src/interfaces/Pagination/PaginationMetaInterface';

interface SolicitationListResponseInterface {
  data: PaginatedSolicitationInterface[] | null;
  links: PaginationLinksInterface;
  meta: PaginationMetaInterface;
}

export default SolicitationListResponseInterface;