import React from 'react';
import { Appbar } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';

const Navbar = () => {
  return (
    <Appbar.Header style={{height: 50}}>
      <Appbar.Content title="Agora" />
      <Entypo name="megaphone" size={24} color="black" />
    </Appbar.Header>
  );
}

export default Navbar;
