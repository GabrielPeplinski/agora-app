import * as React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import ContainerBaseStyle from '@/app/style';
import AgoraMap from '@/src/components/Map/AgoraMap';
import CreateSolicitationButton from '@/src/components/Map/CreateSolicitationButton';
import PaginatedSolicitationInterface from '@/src/interfaces/Solicitation/PaginatedSolicitationInterface';
import PaginationMetaInterface from '@/src/interfaces/Pagination/PaginationMetaInterface';
import { getSolicitations } from '@/src/services/api/Solicitation/SolicitationsService';
import { errorToast, successToast } from '@/utils/use-toast';
import { likeSolicitation } from '@/src/services/api/Solicitation/LikeSolicitationService';
import { useAuthStore } from '@/src/stores/authStore';
import { useLocationCoordinates } from '@/src/context/LocationCoordenatesContextProvider';

interface HandleSolicitationLikeInterface {
  solicitationId: number;
  hasCurrentUserLike: boolean;
}

export default function TabOneScreen() {
  const token = useAuthStore(state => state.token);
  const [data, setData] = useState<PaginatedSolicitationInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [meta, setMeta] = useState<PaginationMetaInterface | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { latitude, longitude } = useLocationCoordinates();

  const fetchSolicitations = async () => {
    const locationLatitude = latitude ? latitude : null;
    const locationLongitude = longitude ? longitude : null;

    setIsLoading(true);
    setRefreshing(true);

    await getSolicitations(locationLatitude, locationLongitude)
      .then((response) => {
        if (response && response.data) {
          setData(response.data);
          setMeta(response.meta);
        }
      })
      .catch((error: any) => {
        console.log(error);
        errorToast({ title: 'Ocorreu um erro ao buscar as solicitações!' });
      })
      .finally(() => {
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchSolicitations();
  }, [latitude, longitude]);

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
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchSolicitations} />
      }
    >
      <View style={ContainerBaseStyle.container}>
        <AgoraMap data={data} />
        <CreateSolicitationButton />
      </View>
    </ScrollView>
  );
}
