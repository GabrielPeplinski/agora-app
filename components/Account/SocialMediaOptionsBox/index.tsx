import React from 'react';
import { Text } from 'react-native-paper';
import { View } from '@/components/Themed';
import FacebookButton from '@/components/Account/Buttons/FacebookButton';
import GoogleButton from '@/components/Account/Buttons/GoogleButton';
import { StyleSheet } from 'react-native';

interface SocialMediaOptionsBoxProps {
  facebookFunction: () => any,
  googleFunction:  () => any,
  textContent:  string
}

const SocialMediaOptionsBox = (props: SocialMediaOptionsBoxProps) =>  {
  return (
    <View style={styles.optionsView}>
      <Text variant={'titleMedium'}>
        {props.textContent}
      </Text>
      <View style={styles.buttonsView}>
        <FacebookButton onClick={props.facebookFunction} />
        <GoogleButton onClick={props.googleFunction} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  optionsView: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default SocialMediaOptionsBox;