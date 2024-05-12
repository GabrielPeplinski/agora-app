import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { View } from '@/src/components/Themed';

interface CreateSolicitationButtonProps {
  onClick: () => void
}

const CreateSolicitationButton = (props: CreateSolicitationButtonProps) => {
  return (
    <View style={styles.container}>
      <FAB
        icon={'plus'}
        style={styles.button}
        label="Nova Solicitação"
        onPress={props.onClick}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 20,
    width: '100%', // ocupar toda a largura do contêiner pai
  },
  button: {
    width: '60%', // 60% da largura do contêiner pai
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default CreateSolicitationButton;