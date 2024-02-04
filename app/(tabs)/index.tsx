import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import RegisterForm from '@/components/Account/RegisterForm';
import AddressForm from '@/components/Account/AddressForm';

export default function TabOneScreen() {
  const [text, setText] = React.useState('');

  return (
    <View style={styles.container}>
      <RegisterForm />
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
