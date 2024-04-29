import * as React from 'react';
import { View } from '@/src/components/Themed';
import ContainerBaseStyle from '@/app/style';
import Navbar from '@/src/components/Shared/Navbar';
import RegisterForm from '@/src/components/Account/RegisterForm';
import LoginForm from '@/src/components/Account/LoginForm';
import MySolicitationsTable from '@/src/components/Account/MySolicitationsTable';

export default function TabOneScreen() {

  return (
    <>
      <Navbar />
      <View style={ContainerBaseStyle.container}>
        <MySolicitationsTable />
      </View>
    </>
  );
}