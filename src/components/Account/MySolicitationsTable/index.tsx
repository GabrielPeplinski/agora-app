import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { SegmentedButtons, Text } from 'react-native-paper';
import SolicitationStatusEnum from '@/src/enums/SolicitationStatusEnum';
import SolicitationCard from '@/src/components/Solicitation/SolicitationCard';
import { getMySolicitations } from '@/src/services/api/Solicitation/MySolicitationsService';
import PaginatedSolicitationInterface from '@/src/interfaces/Solicitation/PaginatedSolicitationInterface';
import SmallLoader from '@/src/components/Shared/SmallLoader';
import { errorToast } from '@/utils/use-toast';

const MySolicitationsTable = () => {
  const [statusFilter, setStatusFilter] = useState('open');
  const [mySolicitations, setSolicitations] = useState<PaginatedSolicitationInterface[] | null | undefined>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMySolicitations = async () => {
      await getMySolicitations(page, statusFilter)
        .then((response) => {
          setSolicitations(response?.data);
          setIsLoading(false);
        }).catch((error: any) => {
          errorToast({ title: 'Ocorreu um erro ao buscar suas solicitações!' });
        });
    };

    fetchMySolicitations();
  }, [statusFilter, page]);

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
            : (mySolicitations && mySolicitations.length > 0)
              ? mySolicitations.map((solicitation) => (
                <SolicitationCard
                  key={solicitation.id}
                  solicitationData={solicitation}
                />
              ))
              : <View style={styles.noSolicitationsText}>
                <Text variant={'titleLarge'}>
                  Você não possui solicitações cadastradas nessa categoria!
                </Text>
              </View>
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
  noSolicitationsText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MySolicitationsTable;