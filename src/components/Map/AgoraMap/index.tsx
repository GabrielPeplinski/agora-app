import { ActivityIndicator, View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { ExpoLeaflet, MapLayer, MapMarker, MapShape } from 'expo-leaflet';
import { useLocationCoordinates } from '@/src/context/LocationCoordenatesContextProvider';
import PaginatedSolicitationInterface from '@/src/interfaces/Solicitation/PaginatedSolicitationInterface';
import { Portal } from 'react-native-paper';
import SolicitationMapModal from '@/src/components/Map/SolicitationMapModal';

const mapLayer: MapLayer = {
  baseLayerName: 'OpenStreetMap',
  baseLayerIsChecked: true,
  layerType: 'TileLayer',
  baseLayer: true,
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
};

interface AgoraMapProps {
  data: PaginatedSolicitationInterface[];
}

const statusIcons: { [key: string]: string } = {
  OPEN: '📢',
  RESOLVED: '✅',
  IN_PROGRESS: '🚧',
};

const AgoraMap = ({ data }: AgoraMapProps) => {
  const { latitude, longitude } = useLocationCoordinates();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [solicitationClickedId, setSolicitationClickedId] = useState<PaginatedSolicitationInterface | null>(null);

  const generateCirclePoints = (center: { lat: number, lng: number }, radius: number, points: number = 32) => {
    const angleStep = (2 * Math.PI) / points;
    const circlePoints = [];

    for (let i = 0; i < points; i++) {
      const angle = i * angleStep;
      const latOffset = radius * Math.cos(angle) / 111320;
      const lngOffset = radius * Math.sin(angle) / (111320 * Math.cos(center.lat * Math.PI / 180));

      circlePoints.push([center.lat + latOffset, center.lng + lngOffset]);
    }

    return circlePoints;
  };

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
      size: [18, 18],
    },
  ];

  const userCircle: MapShape = {
    id: 'userCircle',
    shapeType: 'polygon',
    positions: generateCirclePoints({ lat: latitude, lng: longitude }, 300),
    pathOptions: {
      color: '#004aad', // Cor da borda
      fillColor: 'rgba(0, 74, 173, 0.2)', // Cor de preenchimento com transparência
      weight: 2, // Espessura da borda
      fillOpacity: 0.5, // Opacidade do preenchimento
    },
  };

  const solicitationMarkers = solicitationList.concat(userLocation);

  const handleClickedMarkerId = (solicitationId: string) => {
    const solicitation = data.find((item) => item.id.toString() === solicitationId);

    if (solicitation) {
      setIsModalVisible(true);
      setSolicitationClickedId(solicitation);
    }
  };

  const hideModal = () => {
    setIsModalVisible(false);
    setSolicitationClickedId(null);
  };

  return (
    <View style={styles.container}>
      <ExpoLeaflet
        mapLayers={[mapLayer]}
        mapMarkers={solicitationMarkers}
        mapShapes={[userCircle]}
        mapCenterPosition={{
          lat: latitude,
          lng: longitude,
        }}
        maxZoom={20}
        zoom={16}
        loadingIndicator={() => <ActivityIndicator />}
        onMessage={(message: any) => {
          if (message.tag === 'onMapMarkerClicked' && solicitationList.some(marker => marker.id === message.mapMarkerId)) {
            handleClickedMarkerId(message.mapMarkerId);
          }
        }}
      />

      {isModalVisible && solicitationClickedId && (
        <Portal>
          <SolicitationMapModal
            isModalVisible={isModalVisible}
            hideModal={hideModal}
            solicitation={solicitationClickedId}
          />
        </Portal>
      )}
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
