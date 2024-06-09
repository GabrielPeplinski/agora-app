import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import PaginationMetaInterface from '@/src/interfaces/Pagination/PaginationMetaInterface';

interface PaginationProps {
  meta: PaginationMetaInterface | null;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ meta, setPage }) => {
  if (!meta) {
    return null;
  }

  const { current_page, last_page } = meta;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= last_page) {
      setPage(page);
    }
  };

  let pages = [];
  pages.push(1);
  pages.push(last_page);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button
          mode="contained"
          onPress={() => handlePageChange(current_page - 1)}
          disabled={current_page === 1}
          style={styles.button}
        >
          Anterior
        </Button>
        <View style={styles.pageNumbers}>
          {pages.map((page, index) => (
            <Button
              key={index}
              mode={page === current_page ? 'contained' : 'outlined'}
              onPress={() => handlePageChange(page)}
              disabled={page === current_page}
              labelStyle={page === current_page ? styles.currentPageText : undefined}
              style={[
                styles.pageButton,
                page === current_page && styles.currentPageButton,
              ]}
            >
              {page}
            </Button>
          ))}
        </View>
        <Button
          mode="contained"
          onPress={() => handlePageChange(current_page + 1)}
          disabled={current_page === last_page}
          style={styles.button}
        >
          Próxima
        </Button>
      </View>
      <Text style={styles.pageInfo}>
        Página {current_page} de {last_page}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 5,
  },
  pageNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageButton: {
    marginHorizontal: 5,
  },
  currentPageButton: {
    backgroundColor: '#004aad',
  },
  currentPageText: {
    color: '#fff',
  },
  pageInfo: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default Pagination;
