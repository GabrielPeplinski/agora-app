import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Appbar, Menu, Text } from 'react-native-paper';
import { useAuthStore } from '@/src/stores/authStore';
import LoginForm from '@/src/components/Account/LoginForm';
import { successToast } from '@/utils/use-toast';
import MySolicitationsTable from '@/src/components/Account/MySolicitationsTable';
import ContainerBaseStyle from '@/app/style';
import { router } from 'expo-router';

export default function AuthScreen() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const token = useAuthStore(state => state.token);
  const logout = useAuthStore(state => state.logout);

  const handleLogout = async () => {
    logout();
    successToast({ title: 'Sessão encerrada!' });
  };

  const goToAddressPage = () => {
    setIsMenuVisible(false)
    router.push('/address/')
  }

  const openMenu = () => setIsMenuVisible(true);
  const closeMenu = () => setIsMenuVisible(false);

  return (
    <>
      {token ? (
        <>
          <Appbar.Header style={{ justifyContent: 'flex-end' }}>
            <Appbar.Content title="Olá Usuário" />
            <Menu
              visible={isMenuVisible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity onPress={openMenu}>
                  <Appbar.Action icon="dots-vertical" />
                </TouchableOpacity>}
            >
              <Menu.Item
                leadingIcon="home"
                onPress={goToAddressPage}
                title="Seu endereço"
              />
              <Menu.Item
                leadingIcon="logout"
                onPress={handleLogout}
                title="Encerrar seção"
              />
            </Menu>
          </Appbar.Header>
          <View style={ContainerBaseStyle.container}>
            <MySolicitationsTable />
          </View>
        </>
      ) : (
        <View style={ContainerBaseStyle.container}>
          <LoginForm />
          <View style={styles.registerContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => router.push('/auth/register')}
              style={{ backgroundColor: 'transparent' }}
            >
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
