import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const GoBackButton = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        size={24}
        onPress={() => navigation.goBack()}
        accessibilityLabel="Voltar"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 10,
  },
});

export default GoBackButton;
