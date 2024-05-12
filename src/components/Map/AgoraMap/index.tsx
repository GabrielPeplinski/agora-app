import { ActivityIndicator, View, StyleSheet } from 'react-native';
import React from 'react';
import { ExpoLeaflet, MapLayer, MapMarker } from 'expo-leaflet';
import { useLocationCoordinates } from '@/src/context/LocationCoordenatesContextProvider';

// Map Layer is based on OpenStreetMap, https://www.openstreetmap.org/#map=17/-25.35051/-51.47748
const mapLayer: MapLayer = {
  baseLayerName: 'OpenStreetMap',
  baseLayerIsChecked: true,
  layerType: 'TileLayer',
  baseLayer: true,
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution:
    '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
};

const AgoraMap = () => {

  const { latitude, longitude } = useLocationCoordinates();

  // const { data, refreshData } = useCollection<Troubles>('troubles');
  //
  // const troublesList = data.map((item): MapMarker => {
  //   const icon = item.is_solved ? TroubleIconEnum.SOLVED : TroubleIconEnum.NOT_SOLVED;
  //
  //   return {
  //     id: item.id,
  //     title: item.title,
  //     position: [item.latitude, item.longitude],
  //     icon: icon,
  //     size: [24, 24],
  //   };
  // });

  const userLocation: MapMarker[] = [
    {
      id: '1',
      title: 'Você está aqui!',
      position: { lat: latitude, lng: longitude },
      icon: '<div>👤</div>',
      size: [24, 24],
    },
  ];

  // const markers = array.concat(userLocation);

  return (
    <View style={styles.container}>
      <ExpoLeaflet
        mapLayers={[mapLayer]}
        mapMarkers={userLocation}
        mapCenterPosition={{
          lat: latitude,
          lng: longitude,
        }}
        maxZoom={20}
        zoom={15}
        loadingIndicator={() => <ActivityIndicator />}
        onMessage={(message: any) => {
          if (message.tag === 'onMapClicked') {
            const latitude = message.location.lat;
            const longitude = message.location.lng;
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default AgoraMap;