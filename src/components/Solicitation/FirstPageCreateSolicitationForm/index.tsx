import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import ContainerBaseStyle from '@/app/style';
import { Picker } from '@react-native-picker/picker';
import SmallLoader from '@/src/components/Shared/SmallLoader';
import { getSolicitationCategories } from '@/src/services/api/SolicitationCategoryService';

interface FormFirstPageInterface {
  title: string;
  description: string;
  solicitationCategoryId: number;
}

const FirstPageCreateSolicitationForm = () => {
  const [values, setValues] = useState<FormFirstPageInterface>({
    title: '',
    description: '',
    solicitationCategoryId: 0,
  });

  const [isLoadingCategories, setLoadingCategories] = React.useState(false);

  const handleChange = (field: keyof FormFirstPageInterface) => (text: string) => {
    setValues((prevValues) => ({ ...prevValues, [field]: text }));
  };

  const categories = [
    {
      id: 1,
      title: 'exemplo',
      description: 'uma descição mais complexa',
    },
  ];

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
                  label={category.title}
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