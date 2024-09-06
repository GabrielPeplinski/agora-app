import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import PaginatedSolicitationInterface from '@/src/interfaces/Solicitation/PaginatedSolicitationInterface';
import { deleteSolicitation } from '@/src/services/api/Solicitation/MySolicitationsService';
import { errorToast, successToast } from '@/utils/use-toast';

const RADIUS = 60;
const BUTTON_SIZE = 45;

const MySolicitationOptionsButton = ({ solicitationData }: { solicitationData: PaginatedSolicitationInterface }) => {
  const [isOpen, setIsOpen] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];

  const handleButtonPress = () => {
    setIsOpen(!isOpen);

    Animated.spring(animatedValue, {
      toValue: isOpen ? 0 : 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  const closeOptionsButton = () => {
    setIsOpen(false);

    Animated.spring(animatedValue, {
      toValue: 0,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  const handleDelete = async () => {
    await deleteSolicitation(solicitationData.id)
      .then(() => {
        successToast({ title: 'Solicitação excluída com sucesso!' });
      })
      .catch((error) => {
        if (error?.response?.status === 422) {
          errorToast({ title: 'Não é possível excluir uma solicitação atualizada por algum usuário!' });
        } else {
          errorToast({ title: 'Ocorreu um erro ao tentar excluir esta solicitação!' });
        }
      });
  };

  const confirmDelete = () => {
    closeOptionsButton();

    Alert.alert(
      'Excluir Solicitação',
      `Deseja excluir a solicitação: ${solicitationData.title} ?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => handleDelete(),
        },
      ],
    );
  };

  const options = [
    {
      icon: <Feather name="trash" size={24} color="black" />,
      action: () => confirmDelete(),
    },
    {
      icon: <MaterialIcons name="published-with-changes" size={24} color="black" />,
      action: () => console.log(`Atualizar Status da Solicitação: ${solicitationData.title}`),
    },
    {
      icon: <Feather name="edit" size={24} color="black" />,
      action: () => console.log(`Editar Solicitação: ${solicitationData.title}`),
    },
    {
      icon: <Feather name="eye" size={24} color="black" />,
      action: () => console.log(`Visualizar Solicitação: ${solicitationData.title}`),
    },
  ];

  return (
    <View style={styles.floatContainer}>
      {options.map((option, index) => {
        const angle = (index * (180 / (options.length - 1))) * (Math.PI / 180);
        const x = RADIUS * Math.cos(angle);
        const y = RADIUS * Math.sin(angle);

        return (
          <Animated.View
            key={index}
            style={[
              styles.subButtonContainer,
              {
                transform: [
                  { translateX: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [0, x] }) },
                  { translateY: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [0, -y] }) },
                ],
                opacity: animatedValue,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.subButton}
              onPress={option.action}
            >
              {option.icon}
            </TouchableOpacity>
          </Animated.View>
        );
      })}

      <TouchableOpacity
        onPress={handleButtonPress}
        activeOpacity={0.7}
        style={styles.button}
      >
        <Feather name={isOpen ? 'x' : 'menu'} size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    zIndex: 1000,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#004aad',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    zIndex: 1001,
  },
  subButtonContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    zIndex: 1000,
  },
  subButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: BUTTON_SIZE / 2,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    elevation: 6,
  },
});

export default MySolicitationOptionsButton;
