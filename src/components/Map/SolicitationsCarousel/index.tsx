import * as React from 'react';
import { Dimensions, Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';
import PaginatedSolicitationInterface from '@/src/interfaces/Solicitation/PaginatedSolicitationInterface';
import { useAuthStore } from '@/src/stores/authStore';
import { errorToast } from '@/utils/use-toast';

const SolicitationCarousel = ({ data }: { data: PaginatedSolicitationInterface[] }) => {
  const token = useAuthStore(state => state.token);
  const width = Dimensions.get('window').width;

  const handleLike = (id: number) => {
    if (!token) {
      errorToast({ title: 'Você precisa estar logado para reforçar uma solicitação!' });
    }

    console.log(`Curtiu a solicitação ${id}`);
  }

  const handleGoToSolicitation = (id: number) => {
    console.log(`Acessou a solicitação ${id}`);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ width }}
      >
        {data.map((item, index) => (
          <View key={index} style={[styles.carouselItem, { width }]}>
            <TouchableOpacity onPress={() => handleGoToSolicitation(item.id)}>
              {item.coverImage ? (
                <Image
                  style={styles.image}
                  source={{ uri: item.coverImage }}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  style={styles.image}
                  source={require('../../../../assets/images/no-image.png')}
                  resizeMode="cover"
                />
              )}
              <View style={styles.overlay}>
                <Text style={styles.text}>
                  {item.title.length > 25 ? item.title.substring(0, 25) + '...' : item.title}
                </Text>
                <IconButton
                  icon="thumb-up-outline"
                  size={24}
                  style={styles.iconButton}
                  onPress={() => handleLike(item.id)}
                />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    flex: 1,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffff',
  },
  iconButton: {
    marginBottom: 10,
  },
});

export default SolicitationCarousel;
