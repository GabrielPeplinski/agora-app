import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface CameraButtonProps {
  onPress: () => void;
}

const CameraButton = (props: CameraButtonProps) => {
  const handlePress = () => {
    props.onPress();
  }

  return (
    <View style={styles.floatContainer}>
      <>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
        >
          <MaterialIcons name="add-a-photo" size={40} color="white" />
        </TouchableOpacity>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  floatContainer: {
    position: 'absolute',
    bottom: 40,
    right: 8,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#004aad',
    borderRadius: 24,
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});

export default CameraButton;