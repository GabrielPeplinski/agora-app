import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/images/agora-logo.png')}
        style={styles.logoImage}
      />
      <ActivityIndicator size="large" color={'white'} style={{ transform: [{ scale: 1.5 }] }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,74,173,255)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 350,
    height: 200,
  },
});

export default LoadingScreen;