import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UserSolicitationResponseInterface from '@/src/interfaces/Solicitation/Responses/UserSolicitationInterface';
import { getTranslatedActionDescription, getTranslatedSolicitationStatus } from '@/utils/helpers';
import SolicitationStatusEnum from '@/src/enums/SolicitationStatusEnum';
import SolicitationActionDescriptionEnum from '@/src/enums/SolicitationActionDescriptionEnum';

interface SolicitationHistoricItemProps {
  item: UserSolicitationResponseInterface;
}

const SolicitationHistoricItem = ({ item }: SolicitationHistoricItemProps) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <MaterialCommunityIcons name="calendar" size={18} color="gray" />
          <Text variant="bodyLarge" style={styles.dateText}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.row}>
          <MaterialCommunityIcons name="account" size={18} color="black" style={styles.iconSpacing} />
          <Text variant="bodyLarge">
            Ação realizada por: {item.performedBy}
          </Text>
        </View>

        <View style={styles.row}>
          <MaterialCommunityIcons name="alert-circle" size={18} color="#004aad" />
          <Text variant="bodyLarge" style={styles.statusText}>
            Status: {getTranslatedSolicitationStatus(item.status as SolicitationStatusEnum)}
          </Text>
        </View>

        <Text variant="bodyLarge">
          Ação realizada: {getTranslatedActionDescription(item.actionDescription as SolicitationActionDescriptionEnum)}
        </Text>

        {item.actionDescription === SolicitationActionDescriptionEnum.STATUS_UPDATED && (
          <View>
            <Text variant="titleMedium" style={styles.imageTitle}>
              Registro de Atualização de Status
            </Text>

            {item.image ? (
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: item.image }}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View style={styles.imageContainer}>
                <MaterialCommunityIcons name="image-marker-outline" size={150} color="black" />
              </View>
            )}
          </View>
        )}

      </Card.Content>

      <Divider style={styles.divider} />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconSpacing: {
    marginRight: 6,
  },
  statusText: {
    fontSize: 15,
    color: '#004aad',
    fontWeight: '500',
    marginLeft: 6,
  },
  divider: {
    marginTop: 12,
    backgroundColor: '#e0e0e0',
  },
  image: {
    width: '100%',
    height: 300,
  },
  imageContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    textAlign: 'center',
    marginTop: 20
  }
});

export default SolicitationHistoricItem;
