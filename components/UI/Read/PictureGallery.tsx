import React, { useState } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native';

interface PictureGalleryProps {
  pics: string[];
}

const PictureGallery: React.FC<PictureGalleryProps> = ({ pics }) => {
  const numColumns = 3;
  const screenWidth = Dimensions.get('window').width;
  const imageSize = screenWidth / numColumns - 10;

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (uri: string) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => openModal(item)} style={styles.imageContainer}>
      <Image source={{ uri: item }} style={[styles.image, { width: imageSize, height: imageSize }]} />
    </TouchableOpacity>
  );

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
      <FlatList
        data={pics}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item}-${index}`}
        numColumns={numColumns}
      />

      {/* Fullscreen Image Modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={[styles.fullscreenImage,{width:width,height:height}]} />
            )}
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default PictureGallery;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    
    
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
