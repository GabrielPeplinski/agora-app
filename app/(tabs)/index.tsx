import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import RegisterForm from '@/components/Account/RegisterForm';
import AddressForm from '@/components/Account/AddressForm';
import ZipCodeForm from '@/components/Account/ZipCodeForm';
import LoginForm from '@/components/Account/LoginForm';

export default function TabOneScreen() {
  const [text, setText] = React.useState('');

  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
