import * as React from 'react';
import { View } from '@/src/components/Themed';
import ContainerBaseStyle from '@/app/style';
import AgoraMap from '@/src/components/Map/AgoraMap';
import CreateSolicitationButton from '@/src/components/Map/CreateSolicitationButton';
import { useEffect, useState } from 'react';
import PaginatedSolicitationInterface from '@/src/interfaces/Solicitation/PaginatedSolicitationInterface';
import PaginationMetaInterface from '@/src/interfaces/Pagination/PaginationMetaInterface';
import { getSolicitations } from '@/src/services/api/Solicitation/SolicitationsService';
import { errorToast, successToast } from '@/utils/use-toast';
import SolicitationCarousel from '@/src/components/Map/SolicitationsCarousel';
import { likeSolicitation } from '@/src/services/api/Solicitation/LikeSolicitationService';
import { useAuthStore } from '@/src/stores/authStore';

interface HandleSolicitationLikeInterface {
  solicitationId: number;
  hasCurrentUserLike: boolean;
}

export default function TabOneScreen() {
  const token = useAuthStore(state => state.token);
  const [page, setPage] = useState(0);
  const [data, setData] = useState<PaginatedSolicitationInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [meta, setMeta] = useState<PaginationMetaInterface | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false); // Estado para controle de refresh

  const fetchSolicitations = async () => {
    setIsLoading(true);
    setRefreshing(true); // Inicie o refresh
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
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchSolicitations();
  }, [page]);

  const updateSolicitationLikeStatus = ({ solicitationId, hasCurrentUserLike }: HandleSolicitationLikeInterface) => {
    const updatedData = data.map(item => {
      if (item.id === solicitationId) {
        return {
          ...item,
          hasCurrentUserLike: !hasCurrentUserLike,
        };
      }
      return item;
    });

    setData(updatedData);
  };

  const handleLike = async ({ solicitationId, hasCurrentUserLike }: HandleSolicitationLikeInterface) => {
    if (token) {
      await likeSolicitation({ solicitationId })
        .then(() => {
          updateSolicitationLikeStatus({ solicitationId, hasCurrentUserLike });

          if (!hasCurrentUserLike)
            successToast({ title: 'Você reforçou esta solicitação!' });
        })
        .catch((error: any) => {
          errorToast({ title: 'Ocorreu um erro ao reforçar a solicitação!' });
        });
    } else {
      errorToast({ title: 'Você precisa estar logado para reforçar uma solicitação!' });
    }
  };

  return (
    <>
      <View style={ContainerBaseStyle.container}>
        <SolicitationCarousel
          data={data}
          onLike={handleLike}
          onRefresh={fetchSolicitations}
          refreshing={refreshing}
        />
        <AgoraMap
          data={data}
        />
        <CreateSolicitationButton />
      </View>
    </>
  );
}
