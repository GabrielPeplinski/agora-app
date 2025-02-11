import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, ScrollView, StyleSheet, RefreshControl, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LoadingScreen from '@/src/components/Shared/LoadingScreen';
import { getSolicitation } from '@/src/services/api/Solicitation/SolicitationsService';
import SolicitationResponseInterface from '@/src/interfaces/Solicitation/Responses/SolicitationResponseInterface';
import { errorToast } from '@/utils/use-toast';
import ContainerBaseStyle from '@/app/style';
import UpdateSolicitationStatusForm from '@/src/components/Solicitation/UpdateSolicitationStatusForm';
import GoBackButton from '@/src/components/Shared/GoBackButton';

export default function ShowSolicitationScreen() {
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<SolicitationResponseInterface | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setData(null);
      setIsLoading(true);

      getSolicitationDetails();

      return () => {
        setData(null);
      };
    }, []),
  );

  const getSolicitationDetails = async () => {
    setIsRefreshing(true);
    try {
      const response = await getSolicitation(id.toString());
      if (response) {
        setData(response); // Atualiza o estado com os dados novos
      }
    } catch (error) {
      errorToast({ title: 'Ocorreu um erro ao buscar a solicitação!' });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  return (
    <View style={ContainerBaseStyle.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <GoBackButton />
          <View style={styles.container}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={getSolicitationDetails}
                />
              }
            >
              {data && (
                <UpdateSolicitationStatusForm
                  solicitationData={data}
                />
              )}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 20,
  },
});
