import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostStyles from '../utils/styles/PostStyles';

const ImageCropScreen = ({ navigation, route }) => {
  const { imageUri, imageData } = route.params;
  const [croppedImage, setCroppedImage] = useState(null);

  // Navigation Functions
  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    const finalImage = croppedImage || { uri: imageUri, ...imageData };
    navigation.navigate('PostCaption', { 
      imageData: finalImage
    });
  };

  // Crop Functions
  const handleCrop = async () => {
    try {
      const cropped = await ImageCropPicker.openCropper({
        path: imageUri,
        width: 1080,
        height: 1080,
        cropping: true,
        cropperCircleOverlay: false,
        includeBase64: false,
        mediaType: 'photo',
      });
      setCroppedImage(cropped);
    } catch (error) {
      console.log('Crop cancelled:', error);
    }
  };

  return (
    <SafeAreaView style={PostStyles.container}>
      {/* Header */}
      <View style={PostStyles.header}>
        <TouchableOpacity style={PostStyles.headerButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={PostStyles.headerTitle}>Crop</Text>
        <TouchableOpacity style={PostStyles.headerButton} onPress={handleNext}>
          <Text style={PostStyles.headerButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Image Preview */}
      <Image 
        source={{ uri: croppedImage ? croppedImage.path : imageUri }} 
        style={PostStyles.imagePreview} 
      />

      {/* Crop Options */}
      <View style={PostStyles.cropSection}>
        <Text style={PostStyles.sectionTitle}>Crop Image</Text>
        <TouchableOpacity style={PostStyles.primaryButton} onPress={handleCrop}>
          <Ionicons name="crop" size={18} color="#fff" />
          <Text style={PostStyles.primaryButtonText}>Crop to Square</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ImageCropScreen;