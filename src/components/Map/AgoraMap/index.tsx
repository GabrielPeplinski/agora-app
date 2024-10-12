import { ActivityIndicator, View, StyleSheet } from 'react-native';
import React from 'react';
import { ExpoLeaflet, MapLayer, MapMarker } from 'expo-leaflet';
import { useLocationCoordinates } from '@/src/context/LocationCoordenatesContextProvider';
import PaginatedSolicitationInterface from '@/src/interfaces/Solicitation/PaginatedSolicitationInterface';

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

interface AgoraMapProps {
  data: PaginatedSolicitationInterface[];
}

const statusIcons: { [key: string]: string } = {
  OPEN: '📢',
  RESOLVED: '✅',
  IN_PROGRESS: '🚧',
}

const AgoraMap = ({ data }: AgoraMapProps) => {
  console.log(data)
  const { latitude, longitude } = useLocationCoordinates();

  const solicitationList = data.map((item): MapMarker => {
    const icon: string = statusIcons[item.status.toUpperCase()];

    return {
      id: item.id.toString(),
      title: item.title,
      position: [item.latitudeCoordinates, item.longitudeCoordinates],
      icon: icon,
      size: [24, 24],
    };
  });

  const userLocation: MapMarker[] = [
    {
      id: 'userLocation',
      title: 'Você está aqui!',
      position: { lat: latitude, lng: longitude },
      icon: '<div>👤</div>',
      size: [24, 24],
    },
  ];

  const solicitationMarkers = solicitationList.concat(userLocation);

  return (
    <View style={styles.container}>
      <ExpoLeaflet
        mapLayers={[mapLayer]}
        mapMarkers={solicitationMarkers}
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