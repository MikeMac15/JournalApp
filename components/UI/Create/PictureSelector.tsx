import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { extraStyles } from '../../../Styles/Styles';
interface PhotoSelectionProps {
  photoURLs:string[];
  setPhotoURLs: React.Dispatch<React.SetStateAction<string[]>>;
}
const PictureSelector: React.FC<PhotoSelectionProps> = ({photoURLs,setPhotoURLs}) => {
  if (!photoURLs){
    setPhotoURLs([]);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      // Check if we already have 5 images
      setPhotoURLs((prev) => {
        if (prev.length < 5) {
          return [...prev, result.assets[0].uri];
        }
        return prev;
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {photoURLs && photoURLs.map((uri, index) => (
          <View key={index} style={[{backgroundColor:'white',borderRadius:10, padding:0, marginHorizontal:5},extraStyles.shadow,]}>

          <Image source={{ uri }} style={[styles.image]} />
          </View>
        ))}
      </View>
        {
          photoURLs.length < 5 &&
          <Button title="Add images from camera roll" onPress={pickImage} />
        }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    
  },
  image: {
    width: 60,
    height: 100,
    margin: 0,
    borderRadius: 8,
    // borderColor:'white',
    // borderWidth:3
  },
});

export default PictureSelector;