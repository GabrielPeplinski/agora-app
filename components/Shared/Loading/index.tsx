import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import React from 'react';

const Loading = () => {
  return (
    <View>
      {/*<Image*/}
      {/*  source={require('image.png')}*/}
      {/*  style={styles.logoImage}*/}
      {/*/>*/}

      <Text variant={'titleLarge'}>
        Carregando...
      </Text>
      <ActivityIndicator size="large" color={'blue'} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    width: 350,
    height: 200,
  },
});

export default Loading;