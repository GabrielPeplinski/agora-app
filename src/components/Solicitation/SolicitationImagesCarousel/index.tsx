import * as React from 'react';
import { Dimensions, View, StyleSheet, Image, ScrollView } from 'react-native';

interface SolicitationImagesCarouselProps {
  images: string[] | null | undefined;
}

const SolicitationImagesCarousel = ({ images }: SolicitationImagesCarouselProps) => {
  const width = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ width }}
      >
        {images && images.map((imageUrl, index) => (
          <View key={index} style={[styles.carouselItem, { width }]}>
            <Image
              style={styles.image}
              source={{ uri: imageUrl }}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselItem: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
});

export default SolicitationImagesCarousel;
