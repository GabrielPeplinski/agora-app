import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UserSolicitationResponseInterface from '@/src/interfaces/Solicitation/Responses/UserSolicitationInterface';

interface SolicitationHistoricItemProps {
  item: UserSolicitationResponseInterface;
}

const SolicitationHistoricItem = ({ item }: SolicitationHistoricItemProps) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        {/* Header with Date */}
        <View style={styles.header}>
          <MaterialCommunityIcons name="calendar" size={18} color="gray" />
          <Text style={styles.dateText}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>

        {/* Performed By */}
        <View style={styles.row}>
          <Text variant={'bodyLarge'}>
            Ação realizada por: {item.performedBy}
          </Text>
          <MaterialCommunityIcons name="account" size={18} color="black" style={styles.space}/>
        </View>

        {/* Status */}
        <View style={styles.row}>
          <MaterialCommunityIcons name="alert-circle" size={16} color="#004aad" />
          <Text style={styles.statusText}>Status: {item.status}</Text>
        </View>

        {/* Action Description */}
        <Text style={styles.actionDescriptionText}>
          {item.actionDescription}
        </Text>
      </Card.Content>

      {/* Divider */}
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
  space: {
    marginLeft: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
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
  statusText: {
    fontSize: 15,
    color: '#004aad',
    fontWeight: '500',
    marginLeft: 6,
  },
  actionDescriptionText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  divider: {
    marginTop: 12,
    backgroundColor: '#e0e0e0',
  },
});

export default SolicitationHistoricItem;
