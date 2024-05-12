import * as React from 'react';
import { View } from '@/src/components/Themed';
import ContainerBaseStyle from '@/app/style';
import AgoraMap from '@/src/components/Map/AgoraMap';
import CreateSolicitationButton from '@/src/components/Map/CreateSolicitationButton';
import SolicitationCard from '@/src/components/Solicitation/SolicitationCard';

export default function TabOneScreen() {
  return (
    <>
      {/*<Navbar />*/}
      <View style={ContainerBaseStyle.container}>
        <SolicitationCard />
        <AgoraMap />
        <CreateSolicitationButton
          onClick={() => console.log('opaa')}
        />
      </View>
    </>
  );
}