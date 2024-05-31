import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import SolicitationStatusEnum from '@/src/enums/SolicitationStatusEnum';
import SolicitationCard from '@/src/components/Solicitation/SolicitationCard';
import { getMySolicitations } from '@/src/services/api/Solicitation/MySolicitationsService';
import PaginatedSolicitationInterface from '@/src/interfaces/Solicitation/PaginatedSolicitationInterface';
import SmallLoader from '@/src/components/Shared/SmallLoader';

const MySolicitationsTable = () => {
  const [statusFilter, setStatusFilter] = React.useState('open');
  const [mySolicitations, setSolicitations] = React.useState<PaginatedSolicitationInterface[] | null | undefined>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchMySolicitations = async () => {
      const response = await getMySolicitations(1, statusFilter);
      setSolicitations(response?.data);
      setIsLoading(false);
    };

    fetchMySolicitations();
  }, [statusFilter]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <SegmentedButtons
          value={statusFilter}
          onValueChange={setStatusFilter}
          buttons={[
            {
              value: SolicitationStatusEnum.OPEN,
              label: 'Em aberto',
              checkedColor: 'rgb(33, 90, 189)',
              uncheckedColor: 'black',
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
              uncheckedColor: 'black',
            },
          ]}
        />

        <ScrollView>
          {isLoading
            ? <SmallLoader />
            : mySolicitations?.map((solicitation) => (
              <SolicitationCard
                key={solicitation.id}
                solicitationData={solicitation}
              />
            ))
          }
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
  },
});

export default MySolicitationsTable;