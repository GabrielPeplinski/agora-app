import React, { useEffect, useState } from 'react';
import { Card, ProgressBar, Text, Divider } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SolicitationResponseInterface from '@/src/interfaces/Solicitation/Responses/SolicitationResponseInterface';
import SolicitationStatusEnum from '@/src/enums/SolicitationStatusEnum';

const translateStatus = (status: SolicitationStatusEnum): string => {
  const translations: { [key in SolicitationStatusEnum]: string } = {
    [SolicitationStatusEnum.OPEN]: 'Em aberto',
    [SolicitationStatusEnum.IN_PROGRESS]: 'Em andamento',
    [SolicitationStatusEnum.RESOLVED]: 'Resolvido',
  };

  return translations[status] || 'Status desconhecido';
};

const SolicitationCard = ({ solicitationData }: { solicitationData: SolicitationResponseInterface }) => {
  const [progress, setProgress] = useState(0);

  const progressMapping: { [key in SolicitationStatusEnum]: number } = {
    [SolicitationStatusEnum.OPEN]: 0.2,
    [SolicitationStatusEnum.IN_PROGRESS]: 0.6,
    [SolicitationStatusEnum.RESOLVED]: 1,
  };

  useEffect(() => {
    if (solicitationData && solicitationData.status) {
      setProgress(progressMapping[solicitationData.status] || 0);
    }
  }, [solicitationData]);

  return (
    <View style={styles.cardSpace}>
      <Card style={styles.cardLayout}>
        <Card.Title
          title={solicitationData.title}
          titleStyle={styles.title}
        />

        <Text variant={'titleLarge'} style={styles.statusText}>
          {translateStatus(solicitationData.status)}
        </Text>

        <ProgressBar
          progress={progress}
          color={'rgb(33, 90, 189)'}
          style={styles.progressBar}
        />

        <View style={styles.imageContainer}>
          {solicitationData.coverImage ? (
            <Card.Cover source={{ uri: solicitationData.coverImage }} style={styles.cardCover} />
          ) : (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="image-marker-outline" size={150} color="black" />
            </View>
          )}
        </View>

        <Card.Content>
          <Text variant={'bodyLarge'} style={styles.space}>
            {solicitationData.description}
          </Text>

          <Text variant={'bodyLarge'} style={styles.space}>
            Localização Geográfica: {solicitationData.latitudeCoordinates}, {solicitationData.longitudeCoordinates}
          </Text>

          <Divider style={styles.divider} />
          <Text style={styles.categoryTitle}>
            Categoria:
          </Text>

          {solicitationData.solicitationCategory && (
            <Text variant={'bodyLarge'}>
              {solicitationData.solicitationCategory.name} - {solicitationData.solicitationCategory.description}
            </Text>
          )}

          <Text variant={'bodyLarge'} style={styles.space}>
            Criado em: {new Date(solicitationData.createdAt).toLocaleDateString()}
          </Text>

          <View style={styles.likesContainer}>
            <MaterialCommunityIcons name="thumb-up" size={24} color="blue" />
            <Text style={styles.likesText}>{solicitationData.likesCount}</Text>
          </View>
        </Card.Content>
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
    width: '92%',
    borderRadius: 10,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  space: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusText: {
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  cardCover: {
    height: 200,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  divider: {
    marginVertical: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  likesText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'black',
  },
});

export default SolicitationCard;
