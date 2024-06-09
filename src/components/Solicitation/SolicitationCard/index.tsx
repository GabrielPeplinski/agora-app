import React from 'react';
import { Button, Card, Text } from 'react-native-paper';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import PaginatedSolicitationInterface from '@/src/interfaces/Solicitation/PaginatedSolicitationInterface';

const SolicitationCard = ({ solicitationData }: { solicitationData: PaginatedSolicitationInterface }) => {
  return (
    <View style={styles.cardSpace}>
      <Card style={styles.cardLayout}>
        <Card.Title titleVariant={'titleLarge'} title={solicitationData.title} style={styles.centralizedContent} />

        {
          solicitationData.coverImage
            ? <Card.Cover source={{ uri: solicitationData.coverImage }} />
            : <View style={styles.centralizedContent}>
              <MaterialCommunityIcons name="image-marker-outline" size={150} color="black" />
            </View>
        }

        <Card.Content>
          <Text variant="titleLarge">
            {solicitationData.likesCount}
          </Text>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button mode={'contained'} style={styles.circularButton}>
            <Feather name="edit" size={20} color="black" />
          </Button>
          <Button mode={'contained'} style={styles.circularButton}>
            <MaterialIcons name="published-with-changes" size={24} color="black" />
          </Button>
        </Card.Actions>
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
  },
  circularButton: {
    marginTop: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centralizedContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    justifyContent: 'space-around',
  },
});

export default SolicitationCard;
