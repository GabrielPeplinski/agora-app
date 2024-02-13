import * as React from 'react';
import { View } from '@/components/Themed';
import LoginForm from '@/components/Account/LoginForm';
import ContainerBaseStyle from '@/app/style';

export default function TabOneScreen() {

  return (
    <View style={ContainerBaseStyle.container}>
      <LoginForm />
    </View>
  );
}
