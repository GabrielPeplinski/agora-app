import React from 'react';
import { View } from '@/src/components/Themed';
import { Text } from 'react-native-paper';
import ContainerBaseStyle from '@/app/style';

export default function CreateSolicitationsScreen() {
  return (
    <View style={ContainerBaseStyle.container}>
      <Text>
        Create Solicitations
      </Text>
    </View>
  )
}