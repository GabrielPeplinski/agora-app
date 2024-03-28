import React from 'react';
import { View } from '@/src/components/Themed';
import { StyleSheet } from 'react-native';
import ContainerBaseStyle from '@/app/style';
import { Button, Text } from 'react-native-paper';
import { router } from 'expo-router';

export default function AuthScreen() {
  const goToLoginScreen = () => {
    router.replace('/auth/login');
  }

  const goToRegisterScreen = () => {
    router.replace('/auth/register');
  }

  return (
    <View style={[ContainerBaseStyle.container, styles.container]}>
      <View>
        <Text variant={'titleLarge'}>
          Àgora
        </Text>
      </View>
      <View style={styles.width}>
        <Button style={styles.buttons} onPress={(e: any) => goToLoginScreen()} mode={'contained'}>
          Login
        </Button>
        <Button style={styles.buttons} onPress={(e: any) => goToRegisterScreen()} mode={'contained'}>
          Registrar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    marginTop: 10,
    padding: 10
  },
  width: {
    width: '80%'
  }
})