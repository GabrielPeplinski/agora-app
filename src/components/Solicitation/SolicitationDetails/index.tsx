import React, { useEffect, useState } from 'react';
import SolicitationResponseInterface from '@/src/interfaces/Solicitation/Responses/SolicitationResponseInterface';
import { StyleSheet, View } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';
import SolicitationStatusEnum from '@/src/enums/SolicitationStatusEnum';

const translateStatus = (status: SolicitationStatusEnum): string => {
  const translations: { [key in SolicitationStatusEnum]: string } = {
    [SolicitationStatusEnum.OPEN]: 'Aberto',
    [SolicitationStatusEnum.IN_PROGRESS]: 'Em andamento',
    [SolicitationStatusEnum.RESOLVED]: 'Resolvido',
  };

  return translations[status] || 'Status desconhecido';
};

const SolicitationDetails = ({ solicitationData }: { solicitationData: SolicitationResponseInterface | null }) => {
  const [progress, setProgress] = useState(0);

  const progressMapping: { [key in SolicitationStatusEnum]: number } = {
    [SolicitationStatusEnum.OPEN]: 0.2,
    [SolicitationStatusEnum.IN_PROGRESS]: 0.6,
    [SolicitationStatusEnum.RESOLVED]: 1,
  };

  useEffect(() => {
    if (solicitationData && solicitationData.status) {
      setProgress(progressMapping[solicitationData.status] || 0);
    }
  }, [solicitationData]);

  return (
    <View style={styles.container}>
      <Text variant={'titleLarge'}>
        {solicitationData?.title}
      </Text>

      <Text variant={'titleSmall'}>
        Status Atual: {solicitationData && translateStatus(solicitationData.status)}
      </Text>



      <ProgressBar
        progress={progress}
        color={'rgb(33, 90, 189)'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
  },
});

export default SolicitationDetails;
