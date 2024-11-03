import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuthStore } from '@/src/stores/authStore';
import { errorToast } from '@/utils/use-toast';

const CreateSolicitationButton = () => {
  const token = useAuthStore(state => state.token);

  const handleRedirect = () => {
    if (token) {
      router.push('/solicitations/create');
    } else {
      errorToast({ title: 'Você precisa estar logado para criar uma solicitação!' });
    }
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