import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface FormErrorProp {
  errorMessage: string | undefined;
}

const FormError = ({errorMessage}: FormErrorProp) => {
  return(
    <View>
      <Text variant={'titleSmall'} style={styles.text}>
        {errorMessage}
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    color: '#e3492d'
  }
});

export default FormError;