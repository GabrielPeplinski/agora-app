import React from 'react';
import { View } from '@/src/components/Themed';
import { StyleSheet } from 'react-native';
import ContainerBaseStyle from '@/app/style';
import { Text } from 'react-native-paper';
import { useAuthStore } from '@/src/stores/authStore';
import LoginForm from '@/src/components/Account/LoginForm';
import CurrentUserData from '@/src/components/Account/CurrentUserData';

export default function AuthScreen() {
  const token = useAuthStore(state => state.token);

  return (
    <View style={ContainerBaseStyle.container}>
      <View>
        <Text variant={'titleLarge'}>
          Bem-vindo ao Àgora
        </Text>
      </View>
      {token ? (
        <>
          <CurrentUserData />
        </>
      ) : (
        <LoginForm />
      )}
    </View>
  );
}