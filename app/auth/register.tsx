import * as React from 'react';
import { View } from '@/src/components/Themed';
import ContainerBaseStyle from '@/app/style';
import RegisterForm from '@/src/components/Account/RegisterForm';
import GoBackButton from '@/src/components/Shared/GoBackButton';

export default function RegisterScreen() {
  return (
    <View style={ContainerBaseStyle.container}>
      <GoBackButton/>
      <RegisterForm />
    </View>
  )
}