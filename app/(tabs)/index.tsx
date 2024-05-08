import * as React from 'react';
import { View } from '@/src/components/Themed';
import ContainerBaseStyle from '@/app/style';
import Navbar from '@/src/components/Shared/Navbar';
import AgoraMap from '@/src/components/Map/AgoraMap';

export default function TabOneScreen() {

  return (
    <>
      {/*<Navbar />*/}
      <AgoraMap/>
      {/*<View style={ContainerBaseStyle.container}>*/}

      {/*</View>*/}
    </>
  );
}