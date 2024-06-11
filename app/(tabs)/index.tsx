import * as React from 'react';
import { View } from '@/src/components/Themed';
import ContainerBaseStyle from '@/app/style';
import AgoraMap from '@/src/components/Map/AgoraMap';
import CreateSolicitationButton from '@/src/components/Map/CreateSolicitationButton';
import { useEffect, useState } from 'react';
import PaginatedSolicitationInterface from '@/src/interfaces/Solicitation/PaginatedSolicitationInterface';
import PaginationMetaInterface from '@/src/interfaces/Pagination/PaginationMetaInterface';
import { getSolicitations } from '@/src/services/api/Solicitation/SolicitationsService';
import { errorToast } from '@/utils/use-toast';
import SolicitationCarousel from '@/src/components/Map/SolicitationsCarousel';

export default function TabOneScreen() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<PaginatedSolicitationInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [meta, setMeta] = useState<PaginationMetaInterface | null>(null);

  const fetchSolicitations = async () => {
    setIsLoading(true);
    await getSolicitations(page)
      .then((response) => {
        if (response && response.data) {
          setData(response.data);
          setMeta(response.meta);
        }
      })
      .catch((error: any) => {
        errorToast({ title: 'Ocorreu um erro ao buscar as solicitações!' });
      }).finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchSolicitations();
  }, [page]);

  return (
    <>
      <View style={ContainerBaseStyle.container}>
        <SolicitationCarousel data={data}/>
        <AgoraMap />
        <CreateSolicitationButton />
      </View>
    </>
  );
}