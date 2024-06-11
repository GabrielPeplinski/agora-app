import React from 'react';
import { Card, Text } from 'react-native-paper';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PaginatedSolicitationInterface from '@/src/interfaces/Solicitation/PaginatedSolicitationInterface';

const SolicitationCard = ({ solicitationData }: { solicitationData: PaginatedSolicitationInterface }) => {
  console.log(solicitationData.coverImage);
  return (
    <View style={styles.cardSpace}>
      <Card style={styles.cardLayout}>
        <Card.Title titleVariant="titleLarge" title={solicitationData.title} style={styles.title} />

        <View style={styles.imageContainer}>

          {solicitationData.coverImage ? (
            <Card.Cover source={{ uri: solicitationData.coverImage }} style={styles.cardCover} />
          ) : (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="image-marker-outline" size={150} color="black" />
            </View>
          )}

          <View style={styles.likesContainer}>
            <View style={styles.likeIcon}>
              <MaterialIcons name="thumb-up" size={24} color="white" />
            </View>
            <Text style={styles.likesText}>{solicitationData.likesCount}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.circularButton} onPress={() => console.log('Edit button pressed')}>
            <Feather name="edit" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circularButton}
                            onPress={() => console.log('Published with changes button pressed')}>
            <MaterialIcons name="published-with-changes" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardSpace: {
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  cardLayout: {
    width: '80%',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  cardCover: {
    height: 200,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 50,
  },
  likeIcon: {
    backgroundColor: '#004aad',
    borderRadius: 50,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likesText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 12,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    marginTop: 10,
  },
  circularButton: {
    borderRadius: 30,
    width: 45,
    height: 45,
    backgroundColor: '#004aad',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});

export default SolicitationCard;
