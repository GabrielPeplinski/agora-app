import * as React from 'react';
import { View } from 'react-native';
import ContainerBaseStyle from '../style';
import PersonalDataForm from '@/src/components/Account/PersonalDataForm';
import GoBackButton from '@/src/components/Shared/GoBackButton';

export default function RegisterScreen() {
  return (
    <View style={ContainerBaseStyle.container}>
      <GoBackButton/>
      <PersonalDataForm />
    </View>
  );
}