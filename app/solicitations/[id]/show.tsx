import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, ScrollView, RefreshControl, StatusBar } from 'react-native';
import LoadingScreen from '@/src/components/Shared/LoadingScreen';
import { getSolicitation } from '@/src/services/api/Solicitation/SolicitationsService';
import SolicitationResponseInterface from '@/src/interfaces/Solicitation/Responses/SolicitationResponseInterface';
import { errorToast } from '@/utils/use-toast';
import SolicitationDetails from '@/src/components/Solicitation/SolicitationDetails';
import ContainerBaseStyle from '@/app/style';
import GoBackButton from '@/src/components/Shared/GoBackButton';

export default function ShowSolicitationScreen() {
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<SolicitationResponseInterface | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getSolicitationDetails();
  }, [id]);

  const getSolicitationDetails = async () => {
    setIsRefreshing(true);
    await getSolicitation(id.toString())
      .then((response) => {
        if (response) {
          setData(response);
          setIsLoading(false);
        }
        setIsRefreshing(false);
      }).catch((error: any) => {
        errorToast({ title: 'Ocorreu um erro ao buscar a solicitação!' });
        setIsRefreshing(false);
      });
  };

  return (
    <View style={ContainerBaseStyle.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.container}>
          <GoBackButton />
          <>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={getSolicitationDetails}
                />
              }
            >
              {data && (
                <SolicitationDetails
                  solicitationData={data}
                />
              )}
            </ScrollView>
          </>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 20,
  },
});
