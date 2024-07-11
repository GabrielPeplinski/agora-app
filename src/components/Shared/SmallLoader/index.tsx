import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const SmallLoader = () => {
  return (
    <View>
      <ActivityIndicator size="large" color={'rgb(33, 90, 189)'} />
    </View>
  );
};

export default SmallLoader;