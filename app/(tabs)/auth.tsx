import React from 'react';
import { View } from '@/components/Themed';
import LoginForm from '@/components/Account/LoginForm';
import ContainerBaseStyle from '@/app/style';

export default function AuthScreen() {
  return (
    <View style={ContainerBaseStyle.container}>
      <LoginForm />
    </View>
  );
}