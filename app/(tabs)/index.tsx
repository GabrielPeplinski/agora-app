import * as React from 'react';
import { View } from '@/components/Themed';
import ContainerBaseStyle from '@/app/style';
import Navbar from '@/components/Shared/Navbar';
import RegisterForm from '@/components/Account/RegisterForm';

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
