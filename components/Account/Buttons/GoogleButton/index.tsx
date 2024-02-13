import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import ButtonStyle from '@/components/Account/Buttons/style';
import { FontAwesome } from '@expo/vector-icons';

interface GoogleButtonProps {
  onClick: () => any;
}

const GoogleButton = (props: GoogleButtonProps) => {
  return (
    <Button style={[style.buttonGoogle, ButtonStyle.circularButton]} onPress={(e: any) => props.onClick()}
            mode={'contained'}>
      <FontAwesome name="google" size={20} color="black" />
    </Button>
  );
};

const style = StyleSheet.create({
  buttonGoogle: {
    backgroundColor: '#db4a39',
    marginLeft: 10,
  },
});

export default GoogleButton;