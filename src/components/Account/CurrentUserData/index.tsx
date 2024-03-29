import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { View } from '@/src/components/Themed';
import { me } from '@/src/services/api/AuthService';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Card, Text } from 'react-native-paper';

interface CurrentUserDataProps {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const CurrentUserData = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<CurrentUserDataProps | null>(null);

  const handleCurrentUserData = async () => {
    setLoading(true);
    try {
      const response: any = await me();
      // setUserData(response.data);
      // console.log(userData)
      console.log(response.data);
    } catch (error: any) {
      console.log(error.stack);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCurrentUserData();
  }, []);

  return (
    <View style={styles.container}>
      <FontAwesome name="user-circle-o" size={80} color="black" />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Card style={styles.card}>
          <Card.Title title="Dados do usuário" />
          <Card.Content>
            <Text variant={'bodyMedium'}>
              Nome: {userData?.name}
            </Text>
            <Text variant={'bodyMedium'}>
              Email: {userData?.email}
            </Text>
            <Text variant={'bodyMedium'}>
              Cadastrado desde: {userData?.createdAt}
            </Text>
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  card: {
    width: '80%',
  },
});

export default CurrentUserData;