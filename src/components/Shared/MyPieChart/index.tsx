import React from 'react';
import { View } from 'react-native';
import PieChart from 'react-native-pie-chart';

interface MyPieChartProps {
  widthAndHeight: number;
  series: number[];
  sliceColor: string[];
}

const MyPieChart = ({ widthAndHeight, series, sliceColor }: MyPieChartProps) => {
  return (
    <View>
      <PieChart
        widthAndHeight={widthAndHeight}
        series={series}
        sliceColor={sliceColor}
      />
    </View>
  );
};

export default MyPieChart;