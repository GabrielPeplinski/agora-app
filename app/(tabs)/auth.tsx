import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ContainerBaseStyle from '@/app/style';
import { Appbar, Text } from 'react-native-paper';
import { useAuthStore } from '@/src/stores/authStore';
import LoginForm from '@/src/components/Account/LoginForm';
import CurrentUserData from '@/src/components/Account/CurrentUserData';
import { logout } from '@/src/services/api/AuthService';
import * as Burnt from "burnt";

export default function AuthScreen() {
  const router = useRouter();
  const handleLogout = async () => {
    await logout();

    Burnt.toast({
      title: "Congrats!", // required

      preset: "done", // or "error", "none", "custom"

      message: "", // optional

      haptic: "none", // or "success", "warning", "error"

      duration: 2, // duration in seconds

      shouldDismissByDrag: true,

      from: "top", // "top" or "bottom"

      // optionally customize layout
      layout: {
        iconSize: {
          height: 24,
          width: 24,
        },
      },
    });
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
          <View style={styles.registerContainer}>
            <TouchableOpacity activeOpacity={1} onPress={() => router.push('/auth/register')} style={{backgroundColor: 'transparent'}}>
              <Text variant={'titleSmall'} style={styles.link}>
                Ainda não tem uma conta? Crie a sua aqui!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    marginBottom: 10,
  },
  link: {
    fontWeight: 'bold',
  },
});