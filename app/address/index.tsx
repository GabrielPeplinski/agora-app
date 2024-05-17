import * as React from 'react';
import { View } from '@/src/components/Themed';
import ContainerBaseStyle from '@/app/style';
import AddressForm from '@/src/components/Account/AddressForm';

export default function AddressScreen() {
  return (
    <View style={ContainerBaseStyle.container}>
      <AddressForm />
    </View>
  )
}