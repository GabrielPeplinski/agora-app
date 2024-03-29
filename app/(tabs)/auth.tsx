import React from 'react';
import { View } from '@/src/components/Themed';
import ContainerBaseStyle from '@/app/style';
import { Appbar } from 'react-native-paper';
import { useAuthStore } from '@/src/stores/authStore';
import LoginForm from '@/src/components/Account/LoginForm';
import CurrentUserData from '@/src/components/Account/CurrentUserData';
import { logout } from '@/src/services/api/AuthService';

export default function AuthScreen() {
  const handleLogout = async () => {
    await logout();
  };

  const token = useAuthStore(state => state.token);

  return (
    <>
      {token ? (
        <>
          <Appbar.Header style={{ justifyContent: 'flex-end' }}>
            <Appbar.Content title="Ola Usuario" />
            <Appbar.Action icon="logout" onPress={handleLogout} />
          </Appbar.Header>
          <View style={ContainerBaseStyle.container}>
            <CurrentUserData />
          </View>
        </>
      ) : (
        <View style={ContainerBaseStyle.container}>
          <LoginForm />
        </View>
      )}
    </>
  );
}