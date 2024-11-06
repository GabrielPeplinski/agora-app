import React, { useState } from 'react';
import { StyleSheet, Image, View, Animated } from 'react-native';
import { Modal, Portal, Button, Card, Paragraph, IconButton } from 'react-native-paper';
import PaginatedSolicitationInterface from '@/src/interfaces/Solicitation/PaginatedSolicitationInterface';
import { formatTitle } from '@/utils/helpers';
import SolicitationDetails from '@/src/components/Solicitation/SolicitationDetails';
import SolicitationResponseInterface from '@/src/interfaces/Solicitation/Responses/SolicitationResponseInterface';
import { getSolicitation } from '@/src/services/api/Solicitation/SolicitationsService';
import { errorToast } from '@/utils/use-toast';

interface SolicitationMapModalProps {
  isModalVisible: boolean;
  hideModal: () => void;
  solicitation: PaginatedSolicitationInterface;
  onLike: ({ solicitationId, hasCurrentUserLike }: { solicitationId: number, hasCurrentUserLike: boolean }) => void;
}

const SolicitationMapModal: React.FC<SolicitationMapModalProps> = ({ isModalVisible, hideModal, solicitation, onLike, }) => {
  const [solicitationData, setSolicitationData] = useState<SolicitationResponseInterface | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));

  const getSolicitationData = async () => {
    await getSolicitation(solicitation.id)
      .then((response) => {
        if (response) {
          setSolicitationData(response);
        }
      }).catch((error: any) => {
        errorToast({ title: 'Ocorreu um erro ao buscar a solicitação!' });
      });
  };

  const handleLike = () => {
    hideModal();
    onLike({ solicitationId: solicitation.id, hasCurrentUserLike: solicitation.hasCurrentUserLike });
  };

  return (
    <Portal>
      <Modal
        visible={isModalVisible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContainer}
      >
        <Animated.View style={{ ...styles.animatedView, opacity: fadeAnim }}>
          {solicitationData && (
            <IconButton
              icon="close"
              size={24}
              onPress={hideModal}
              style={styles.closeButton}
            />
          )}

          {solicitationData ? (
            <View style={styles.detailsModal}>
              <SolicitationDetails solicitationData={solicitationData} />
            </View>
          ) : (
            <Card style={styles.simpleCard}>
              <Card.Title
                title={formatTitle(solicitation.title)}
                subtitle={`Número de reforços: ${solicitation.likesCount}`}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon={solicitation.hasCurrentUserLike ? 'thumb-up' : 'thumb-up-outline'}
                    onPress={handleLike}
                  />
                )}
              />
              <Card.Content>
                {solicitation.coverImage && (
                  <Image
                    source={{ uri: solicitation.coverImage }}
                    style={styles.image}
                  />
                )}
                <Paragraph>Informações detalhadas sobre a solicitação selecionada.</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button onPress={hideModal}>Fechar</Button>
                <Button mode="contained" onPress={getSolicitationData}>
                  Ver Detalhes
                </Button>
              </Card.Actions>
            </Card>
          )}
        </Animated.View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    padding: 20,
  },
  animatedView: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  simpleCard: {
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  detailsModal: {
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default SolicitationMapModal;