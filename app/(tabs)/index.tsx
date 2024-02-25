import * as React from 'react';
import { View } from '@/src/components/Themed';
import ContainerBaseStyle from '@/app/style';
import Navbar from '@/src/components/Shared/Navbar';
import RegisterForm from '@/src/components/Account/RegisterForm';

export default function TabOneScreen() {

  return (
    <>
      <Navbar />
      <View style={ContainerBaseStyle.container}>
        <RegisterForm/>
      </View>
    </>
  );
}