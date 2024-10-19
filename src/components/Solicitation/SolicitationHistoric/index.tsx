import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

import UserSolicitationResponseInterface from '@/src/interfaces/Solicitation/Responses/UserSolicitationInterface';
import SolicitationHistoricItem from '@/src/components/Solicitation/SolicitationHistoricItem';

interface SolicitationHistoricProps {
  data: UserSolicitationResponseInterface[] | null | undefined;
}

const SolicitationHistoric = ({ data }: SolicitationHistoricProps) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant={'titleMedium'}>Histórico indisponível!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data.map(item => (
        <SolicitationHistoricItem key={item.id} item={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default SolicitationHistoric;
