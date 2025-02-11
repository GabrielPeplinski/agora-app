import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as Location from 'expo-location';
import { errorToast } from '@/utils/use-toast';

interface LocationCoordinateProps {
  latitude: number;
  longitude: number;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
}

const LocationCoordinatesContext =
  createContext<LocationCoordinateProps | null>(null);

export function LocationCoordinatesContextProvider({ children }: PropsWithChildren) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const permission = await Location.requestForegroundPermissionsAsync();

        if (permission) {
          const location = await Location.getCurrentPositionAsync({});

          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
        } else {
          errorToast({
            title: 'Permissão de acesso de localização em tempo real negada! Esta ação é necessária, para criar novas solicitações!'
          });
        }
      } catch (error) {
        throw Error;
      }
    };

    getLocation();
  }, []);

  return (
    <LocationCoordinatesContext.Provider
      value={{ latitude, longitude, setLatitude, setLongitude }}
    >
      {children}
    </LocationCoordinatesContext.Provider>
  );
}

export function useLocationCoordinates() {
  const context = useContext(LocationCoordinatesContext);

  if (!context)
    throw new Error(
      'useLocationCoordenates must be used inside LocationCoordenatesContext',
    );

  return context;
}