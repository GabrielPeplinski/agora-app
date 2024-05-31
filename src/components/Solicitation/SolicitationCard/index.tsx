import React from 'react';
import { Button, Card, Text } from 'react-native-paper';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import ContainerBaseStyle from '@/app/style';
import PaginatedSolicitationInterface from '@/src/interfaces/Solicitation/PaginatedSolicitationInterface';

const SolicitationCard = ({solicitationData} : {solicitationData: PaginatedSolicitationInterface}) => {
  return (
    <View style={ContainerBaseStyle.container}>
      <Card>
        <Card.Title titleVariant={'titleLarge'} title="Card Title" />

        {
          solicitationData.coverImage
            ? <Card.Cover source={{ uri: solicitationData.coverImage }}></Card.Cover>
            : <MaterialCommunityIcons name="image-marker-outline" size={30} color="black" />
        }

        <Card.Content>
          <Text variant="titleLarge">
            {solicitationData.title}
          </Text>
        </Card.Content>
        <Card.Actions>
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
  circularButton: {
    marginTop: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SolicitationCard;