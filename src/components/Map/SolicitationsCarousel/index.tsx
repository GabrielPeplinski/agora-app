import * as React from 'react';
import { Dimensions, Text, View, StyleSheet, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';

interface CarouselItem {
  title: string;
  image: string;
  link: string;
}

const data: CarouselItem[] = [
  {
    title: 'Primeiro Item',
    image: 'https://pareto.io/wp-content/uploads/2023/07/header-tess-ai-urso-1.jpg',
    link: 'https://example.com/primeiro-item',
  },
  {
    title: 'Segundo Item',
    image: 'https://pareto.io/wp-content/uploads/2023/07/header-tess-ai-urso-1.jpg',
    link: 'https://example.com/segundo-item',
  },
  {
    title: 'Terceiro Item',
    image: 'https://pareto.io/wp-content/uploads/2023/07/header-tess-ai-urso-1.jpg',
    link: 'https://example.com/terceiro-item',
  },
  {
    title: 'Quarto Item',
    image: 'https://pareto.io/wp-content/uploads/2023/07/header-tess-ai-urso-1.jpg',
    link: 'https://example.com/quarto-item',
  },
  {
    title: 'Quinto Item',
    image: 'https://pareto.io/wp-content/uploads/2023/07/header-tess-ai-urso-1.jpg',
    link: 'https://example.com/quinto-item',
  },
  {
    title: 'Sexto Item',
    image: 'https://pareto.io/wp-content/uploads/2023/07/header-tess-ai-urso-1.jpg',
    link: 'https://example.com/sexto-item',
  },
];

const SolicitationCarousel: React.FC = () => {
  const width = Dimensions.get('window').width;

  const handlePress = (link: string) => {
    Linking.openURL(link);
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
            <TouchableOpacity onPress={() => handlePress(item.link)}>
              <Image
                style={styles.image}
                source={{ uri: item.image }}
                resizeMode="cover"
              />
              <Text style={styles.text}>
                {item.title}
              </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '80%',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
  },
});

export default SolicitationCarousel;
