import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import SolicitationStatusEnum from '@/src/enums/SolicitationStatusEnum';
import SolicitationCard from '@/src/components/Solicitation/SolicitationCard';

const MySolicitationsTable = () => {
  const [value, setValue] = React.useState('open');
  console.log(value)

  return (
    <>
      <SafeAreaView style={styles.container}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: SolicitationStatusEnum.OPEN,
              label: 'Em aberto',
              checkedColor: 'rgb(33, 90, 189)',
              uncheckedColor: 'black'
            },
            {
              value: SolicitationStatusEnum.IN_PROGRESS,
              label: 'Em andamento',
              checkedColor: 'rgb(33, 90, 189)',
              uncheckedColor: 'black',
            },
            {
              value: SolicitationStatusEnum.RESOLVED,
              label: 'Resolvidas',
              checkedColor: 'rgb(33, 90, 189)',
              uncheckedColor: 'black'
            },
          ]}
        />

        <ScrollView>
          <SolicitationCard />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default MySolicitationsTable;