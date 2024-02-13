import React from 'react';
import { Appbar } from 'react-native-paper';

const Navbar = () => {
  return (
    <Appbar.Header style={{height: 50}}>
      <Appbar.Content title="Agora" />
    </Appbar.Header>
  );
}

export default Navbar;
