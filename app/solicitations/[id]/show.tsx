import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import ContainerBaseStyle from '@/app/style';
import LoadingScreen from '@/src/components/Shared/LoadingScreen';
import { getSolicitation } from '@/src/services/api/Solicitation/SolicitationsService';
import SolicitationResponseInterface from '@/src/interfaces/Solicitation/Responses/SolicitationResponseInterface';
import { errorToast } from '@/utils/use-toast';
import SolicitationDetails from '@/src/components/Solicitation/SolicitationDetails';

export default function ShowSolicitationScreen() {
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<SolicitationResponseInterface | null>(null);

  useEffect(() => {
    getSolicitationDetails();
  }, [id]);

  const getSolicitationDetails = async () => {
    await getSolicitation(id.toString())
      .then((response) => {
        if (response) {
          setData(response);
          setIsLoading(false);
          console.log(response);
        }
      }).catch((error: any) => {
        errorToast({ title: 'Ocorreu um erro ao buscar a solicitação!' });
      });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View style={ContainerBaseStyle.container}>
          <SolicitationDetails
            solicitationData={data}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});