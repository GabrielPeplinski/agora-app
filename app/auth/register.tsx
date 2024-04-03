import * as React from 'react';
import { View } from '@/src/components/Themed';
import ContainerBaseStyle from '@/app/style';
import RegisterForm from '@/src/components/Account/RegisterForm';

export default function RegisterScreen() {
  return (
    <View style={ContainerBaseStyle.container}>
      <RegisterForm />
    </View>
  )
}