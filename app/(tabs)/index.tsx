import * as React from 'react';
import { View } from '@/src/components/Themed';
import ContainerBaseStyle from '@/app/style';
import AgoraMap from '@/src/components/Map/AgoraMap';
import CreateSolicitationButton from '@/src/components/Map/CreateSolicitationButton';
import SolicitationsCarousel from '@/src/components/Map/SolicitationsCarousel';
import MyCamera from '../../src/components/Solicitation/MyCamera';

export default function TabOneScreen() {
  return (
    <>
      <View style={ContainerBaseStyle.container}>
        <SolicitationsCarousel/>
        <AgoraMap />
        <CreateSolicitationButton />
      </View>
    </>
  );
}