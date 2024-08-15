import * as React from 'react';
import { View } from 'react-native';
import ContainerBaseStyle from '../style';
import PersonalDataForm from '@/src/components/Account/PersonalDataForm';

export default function RegisterScreen() {
  return (
    <View style={ContainerBaseStyle.container}>
      <PersonalDataForm />
    </View>
  );
}