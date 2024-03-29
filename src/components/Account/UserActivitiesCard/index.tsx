import React from 'react';
import { View } from '@/src/components/Themed';
import { Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface UserActivitiesCardProps {
  totalSolicitationReinforcements: number;
  totalCreatedSolicitations: number;
}

const UserActivitiesCard = (props: UserActivitiesCardProps) => {
  return (
    <View style={styles.container}>
      <Card style={[styles.greenCard, styles.card]}>
        <Card.Title title="Solicitações Criadas" />
        <Card.Content>
          <Text style={styles.text}>
            {props.totalSolicitationReinforcements}
          </Text>
        </Card.Content>
      </Card>

      <Card style={[styles.blueCard, styles.card]}>
        <Card.Title title="Solicitações Curtidas" />
        <Card.Content>
          <Text style={styles.text}>
            {props.totalSolicitationReinforcements}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 5,
  },
  greenCard: {
    backgroundColor: '#50b650',
  },
  blueCard: {
    backgroundColor: '#70a8d2',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default UserActivitiesCard;