import * as React from 'react';
import { Dimensions, Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';
import PaginatedSolicitationInterface from '@/src/interfaces/Solicitation/PaginatedSolicitationInterface';

interface SolicitationCarouselProps {
  data: PaginatedSolicitationInterface[];
  onLike: ({ solicitationId, hasCurrentUserLike }: { solicitationId: number, hasCurrentUserLike: boolean }) => void;
}

const SolicitationCarousel = ({ data, onLike }: SolicitationCarouselProps) => {
  const width = Dimensions.get('window').width;

  const handleGoToSolicitation = (id: number) => {
    console.log(`Acessou a solicitação ${id}`);
  };

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
                  {item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title}
                </Text>
                <IconButton
                  icon={item.hasCurrentUserLike ? 'thumb-up' : 'thumb-up-outline'}
                  size={24}
                  style={styles.iconButton}
                  onPress={
                    () => onLike({ solicitationId: item.id, hasCurrentUserLike: item.hasCurrentUserLike })
                  }
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
