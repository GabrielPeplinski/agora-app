import * as React from 'react';
import { View } from '@/src/components/Themed';
import ContainerBaseStyle from '@/app/style';
import AgoraMap from '@/src/components/Map/AgoraMap';
import CreateSolicitationButton from '@/src/components/Map/CreateSolicitationButton';

export default function TabOneScreen() {
  return (
    <>
      <View style={ContainerBaseStyle.container}>
        <AgoraMap />
        <CreateSolicitationButton />
      </View>
    </>
  );
}