import React from 'react';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import PaginatedSolicitationInterface from '@/src/interfaces/Solicitation/PaginatedSolicitationInterface';
import MySolicitationOptionsButton from '@/src/components/Solicitation/MySolicilitationOptionsButton';

const SolicitationCard = ({ solicitationData }: { solicitationData: PaginatedSolicitationInterface }) => {

  return (
    <View style={styles.cardSpace}>
      <Card style={styles.cardLayout}>
        <Card.Title titleVariant="titleLarge" title={solicitationData.title} style={styles.title} />

        <View style={styles.likesContainer}>
          <View style={styles.likeIcon}>
            <MaterialIcons name="thumb-up" size={24} color="white" />
          </View>
          <Text style={styles.likesText}>{solicitationData.likesCount}</Text>
        </View>

        <View style={styles.imageContainer}>
          {solicitationData.coverImage ? (
            <Card.Cover source={{ uri: solicitationData.coverImage }} style={styles.cardCover} />
          ) : (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="image-marker-outline" size={150} color="black" />
            </View>
          )}
        </View>

        <View style={styles.actions}>
          <MySolicitationOptionsButton solicitationData={solicitationData} />
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
    overflow: 'visible',
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
    top: 5,
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
    marginBottom: 5,
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
    overflow: 'visible',
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    marginTop: 10,
    zIndex: 1000,
  },
});

export default SolicitationCard;
