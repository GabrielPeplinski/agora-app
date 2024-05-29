import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import ContainerBaseStyle from '@/app/style';
import { Picker } from '@react-native-picker/picker';
import SmallLoader from '@/src/components/Shared/SmallLoader';
import { getSolicitationCategories } from '@/src/services/api/SolicitationCategoryService';
import SolicitationCategoryInterface from '@/src/interfaces/SolicitationCategoryInterface';
import { useLocationCoordinates } from '@/src/context/LocationCoordenatesContextProvider';
import { router } from 'expo-router';

interface FormFirstPageInterface {
  title: string;
  description: string;
  solicitationCategoryId: number;
  latitudeCoordinates: string;
  longitudeCoordinates: string;
}

const FirstPageCreateSolicitationForm = () => {
  const [isLoadingCategories, setLoadingCategories] = React.useState(true);
  const [categories, setCategories] = useState<SolicitationCategoryInterface[]>([]);
  const { latitude, longitude } = useLocationCoordinates();

  const handleChange = (field: keyof FormFirstPageInterface) => (text: string) => {
    setValues((prevValues) => ({ ...prevValues, [field]: text }));
  };

  const [values, setValues] = useState<FormFirstPageInterface>({
    title: '',
    description: '',
    solicitationCategoryId: 0,
    latitudeCoordinates: '',
    longitudeCoordinates: ''
  });

  useEffect(() => {
    if (latitude == null || longitude == null) {
      router.back();
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        latitudeCoordinates: latitude.toString(),
        longitudeCoordinates: longitude.toString(),
      }));
    }
  }, [latitude, longitude]);

  useEffect(() => {
    getSolicitationCategories().then((response) => {
      setCategories(response ? response : []);
      setLoadingCategories(false);
    });
  }, []);

  return (
    <View style={[ContainerBaseStyle.container, styles.container]}>

      <Text variant={'titleLarge'}>
        Informações Básicas
      </Text>

      <View style={styles.form}>

        <TextInput
          style={styles.space}
          label="Título"
          placeholder="Seu título"
          value={values.title}
          onChangeText={handleChange('title')}
        />

        <TextInput
          style={styles.descriptionInput}
          label="Descrição"
          placeholder="Sua descrição"
          value={values.description}
          onChangeText={handleChange('description')}
          multiline
          numberOfLines={10}
        />

        {isLoadingCategories ? (
          <SmallLoader />
        ) : (
          <>
            <Picker
              selectedValue={values.solicitationCategoryId}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setValues(prevValues => ({ ...prevValues, solicitationCategoryId: itemValue }))
              }
            >
              <Picker.Item label="Selecione uma categoria" value={0} />
              {categories.map((category) => (
                <Picker.Item
                  key={category.id}
                  label={category.name}
                  value={category.id}
                />
              ))}
            </Picker>
          </>
        )}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  space: {
    marginTop: 10,
  },
  container: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  descriptionInput: {
    marginTop: 10,
    height: 100,
  },
  form: {
    width: '80%',
  },
  picker: {
    height: 50,
    width: '100%',
    marginTop: 10,
  },
});

export default FirstPageCreateSolicitationForm;