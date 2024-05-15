import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const CreateSolicitationButton = () => {
  const handleRedirect = () => {
    router.push('/solicitations/create');
  };

  return (
    <View style={styles.floatContainer}>
      <>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRedirect}
        >
          <FontAwesome name="plus" size={40} color="white" />
        </TouchableOpacity>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  floatContainer: {
    position: 'absolute',
    bottom: 40,
    right: 8,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#004aad',
    borderRadius: 24,
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});

export default CreateSolicitationButton;