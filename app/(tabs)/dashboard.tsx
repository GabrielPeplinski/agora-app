import React, { useRef, useState } from 'react';
import { View } from '@/src/components/Themed';
import ContainerBaseStyle from '@/app/style';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import SolicitationStatusEnum from '@/src/enums/SolicitationStatusEnum';
import { SegmentedButtons } from 'react-native-paper';
import MyPieChart from '@/src/components/Shared/MyPieChart';

export default function DashboardScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('open');
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const widthAndHeight = 250;
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00'];

  return (
    <>
      <View style={ContainerBaseStyle.container}>
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
                // onRefresh={fetchSolicitationsDashboardData}
              />
            }
          >

            <MyPieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
            />

          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});