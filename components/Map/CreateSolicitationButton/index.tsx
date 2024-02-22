import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { View } from '@/components/Themed';

interface CreateSolicitationButtonProps {
  onClick: () => any
}

const CreateSolicitationButton = (props: CreateSolicitationButtonProps) => (
  <View>
    <FAB
      icon={'plus'}
      style={styles.fab}
      label="Nova Solicitação"
      onPress={props.onClick()}
    />
  </View>
);

const styles = StyleSheet.create({
  fab: {
    width: '40%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateSolicitationButton;
