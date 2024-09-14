import React, { useEffect, useState, useRef } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { SegmentedButtons, Text } from 'react-native-paper';
import SolicitationStatusEnum from '@/src/enums/SolicitationStatusEnum';
import SolicitationCard from '@/src/components/Solicitation/SolicitationCard';
import { getMySolicitations } from '@/src/services/api/Solicitation/MySolicitationsService';
import PaginatedSolicitationInterface from '@/src/interfaces/Solicitation/PaginatedSolicitationInterface';
import SmallLoader from '@/src/components/Shared/SmallLoader';
import { errorToast } from '@/utils/use-toast';
import Pagination from '@/src/components/Shared/Pagination';
import PaginationMetaInterface from '@/src/interfaces/Pagination/PaginationMetaInterface';

const MySolicitationsTable = () => {
  const [statusFilter, setStatusFilter] = useState('open');
  const [mySolicitations, setSolicitations] = useState<PaginatedSolicitationInterface[] | null | undefined>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<PaginationMetaInterface | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMySolicitations = async () => {
    setIsLoading(true);
    setRefreshing(true);
    await getMySolicitations(page, statusFilter)
      .then((response) => {
        if (response) {
          setSolicitations(response.data);
          setMeta(response.meta);
        }
      }).catch((error: any) => {
        errorToast({ title: 'Ocorreu um erro ao buscar suas solicitações!' });
      }).finally(() => {
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchMySolicitations();
  }, [statusFilter, page]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [page]);

  const handleDeleteSolicitation = (id: number) => {
    setSolicitations((prevSolicitations) => prevSolicitations?.filter(solicitation => solicitation.id !== id));
  };

  return (
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

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchMySolicitations}
          />
        }
      >
        {isLoading
          ? <SmallLoader />
          : (mySolicitations && mySolicitations.length > 0)
            ? mySolicitations.map((solicitation) => (
              <SolicitationCard
                key={solicitation.id}
                solicitationData={solicitation}
                onDelete={() => handleDeleteSolicitation(solicitation.id)}
              />
            ))
            : <View style={styles.noSolicitationsText}>
              <Text variant={'titleLarge'}>
                Você não possui solicitações cadastradas nessa categoria!
              </Text>
            </View>
        }
        {!isLoading && mySolicitations && mySolicitations.length > 0 && <Pagination meta={meta} setPage={setPage} />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noSolicitationsText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MySolicitationsTable;
