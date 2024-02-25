import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import ButtonStyle from '@/src/components/Account/Buttons/style';

interface FacebookButtonProps {
  onClick: () => any;
}

const FacebookButton = (props: FacebookButtonProps) => {
  return (
    <Button style={[style.buttonFacebook, ButtonStyle.circularButton]} onPress={(e: any) => props.onClick()}
            mode={'contained'}>
      <FontAwesome5 name="facebook" size={20} color="black" />
    </Button>
  );
};

const style = StyleSheet.create({
  buttonFacebook: {
    backgroundColor: '#3b5998',
  },
});

export default FacebookButton;