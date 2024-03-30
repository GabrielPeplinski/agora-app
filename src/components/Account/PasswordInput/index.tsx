import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface PasswordInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

const PasswordInput = (props: PasswordInputProps) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  return (
    <TextInput
      style={styles.space}
      label={props.label}
      value={props.value}
      onChangeText={props.onChangeText}
      secureTextEntry={secureTextEntry}
      right={
        <TextInput.Icon
          icon={secureTextEntry ? 'eye' : 'eye-off'}
          onPress={() => setSecureTextEntry((prevSecureTextEntry) => !prevSecureTextEntry)}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  space: {
    marginTop: 10,
  },
});

export default PasswordInput;