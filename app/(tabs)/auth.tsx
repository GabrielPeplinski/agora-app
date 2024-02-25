import React from 'react';
import { View } from '@/src/components/Themed';
import LoginForm from '@/src/components/Account/LoginForm';
import ContainerBaseStyle from '@/app/style';

export default function AuthScreen() {
  return (
    <View style={ContainerBaseStyle.container}>
      <LoginForm />
    </View>
  );
}