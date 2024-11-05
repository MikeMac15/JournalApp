import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getPicFromS3 } from '../../API/APIhelpers';

interface PictureGalleryProps {
  pics: string[]; // Array of S3 keys for the images
}

const PictureGallery: React.FC<PictureGalleryProps> = ({ pics }) => {
  const numColumns = 3;
  const screenWidth = Dimensions.get('window').width;
  const imageSize = screenWidth / numColumns - 10;

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageUrls = async () => {
      setLoading(true); // Start loading
      const urls = await Promise.all(pics.map(async (pic) => {
        const url = await getPicFromS3(pic);
        return url || ''; // Fallback to empty string if URL retrieval fails
      }));
      console.log(urls);
      setImageUrls(urls); // Set valid URLs only
      setLoading(false); // Stop loading when images are set
    };

    fetchImageUrls();
  }, [pics]);

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
      {loading ? ( // Display loading indicator while loading
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={imageUrls}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item}-${index}`}
          numColumns={numColumns}
        />
      )}

      {/* Fullscreen Image Modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={[styles.fullscreenImage, { width, height }]} />
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
