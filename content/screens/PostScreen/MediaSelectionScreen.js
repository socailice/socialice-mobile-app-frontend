import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  PermissionsAndroid,
  Platform,
  FlatList,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostStyles from '../../utils/styles/PostStyles';

const MediaSelectionScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestPermissions();
  }, []);

  // Navigation Functions
  const handleClose = () => {
    navigation.navigate('Main');
  };

  const handleNext = () => {
    if (selectedPhoto) {
      navigation.navigate('ImageCrop', { 
        imageUri: selectedPhoto.uri,
        imageData: selectedPhoto
      });
    }
  };

  // Permission and Photo Loading
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        // Only request gallery permissions - camera permissions are handled by react-native-image-picker
        const permission = Platform.Version >= 33 
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
        
        const granted = await PermissionsAndroid.request(permission);
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          loadPhotos();
        } else {
          Alert.alert(
            'Permission Denied', 
            'Gallery access is required to select photos',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Settings', onPress: () => console.log('Open app settings') }
            ]
          );
          setLoading(false);
        }
      } catch (err) {
        console.warn('Permission request error:', err);
        setLoading(false);
      }
    } else {
      // iOS permissions are handled automatically by react-native-image-picker and CameraRoll
      loadPhotos();
    }
  };

  const loadPhotos = async () => {
    try {
      const photos = await CameraRoll.getPhotos({
        first: 30,
        assetType: 'Photos',
      });
      setPhotos(photos.edges);
      if (photos.edges.length > 0) {
        setSelectedPhoto(photos.edges[0].node.image);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading photos:', error);
      Alert.alert('Error', 'Failed to load photos from gallery');
      setLoading(false);
    }
  };

  // Camera Function
  const openCamera = () => {
    console.log('Opening camera...');
    
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      saveToPhotos: true,
      includeBase64: false,
    };

    console.log('Camera options:', options);

    launchCamera(options, (response) => {
      console.log('Full camera response:', JSON.stringify(response, null, 2));
      
      if (response.didCancel) {
        console.log('User cancelled camera');
        return;
      }
      
      if (response.error) {
        console.log('Camera error:', response.error);
        Alert.alert('Camera Error', response.error);
        return;
      }

      if (response.errorCode) {
        console.log('Camera errorCode:', response.errorCode);
        Alert.alert('Camera Error Code', response.errorCode);
        return;
      }

      if (response.errorMessage) {
        console.log('Camera errorMessage:', response.errorMessage);
        Alert.alert('Camera Error Message', response.errorMessage);
        return;
      }
      
      if (response.assets && response.assets.length > 0) {
        console.log('Camera success, asset:', response.assets[0]);
        const asset = response.assets[0];
        navigation.navigate('ImageCrop', { 
          imageUri: asset.uri,
          imageData: asset
        });
      } else {
        console.log('No assets in response');
        Alert.alert('No Photo', 'No photo was captured');
      }
    });
  };

  // Render Functions
  const renderPhoto = ({ item }) => (
    <TouchableOpacity
      style={PostStyles.gridItem}
      onPress={() => setSelectedPhoto(item.node.image)}
    >
      <Image 
        source={{ uri: item.node.image.uri }} 
        style={PostStyles.gridImage}
        onError={(error) => console.log('Image load error:', error)}
      />
      {selectedPhoto?.uri === item.node.image.uri && (
        <View style={PostStyles.selectedOverlay}>
          <Ionicons name="checkmark-circle" size={20} color="#007AFF" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={PostStyles.container}>
      {/* Header */}
      <View style={PostStyles.header}>
        <TouchableOpacity style={PostStyles.headerButton} onPress={handleClose}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={PostStyles.headerTitle}>New Post</Text>
        <TouchableOpacity 
          style={PostStyles.headerButton} 
          onPress={handleNext} 
          disabled={!selectedPhoto}
        >
          <Text style={[
            PostStyles.headerButtonText, 
            !selectedPhoto && PostStyles.headerButtonDisabled
          ]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>

      {/* Image Preview */}
      {selectedPhoto ? (
        <Image 
          source={{ uri: selectedPhoto.uri }} 
          style={PostStyles.imagePreview}
          onError={(error) => console.log('Preview image error:', error)}
        />
      ) : (
        <View style={[PostStyles.imagePreview, PostStyles.placeholderPreview]}>
          <Text style={PostStyles.placeholderText}>Select a photo</Text>
        </View>
      )}

      {/* Options */}
      <View style={PostStyles.optionsContainer}>
        <TouchableOpacity style={PostStyles.primaryButton} onPress={openCamera}>
          <Ionicons name="camera" size={18} color="#fff" />
          <Text style={PostStyles.primaryButtonText}>Camera</Text>
        </TouchableOpacity>
        <Text style={PostStyles.galleryTitle}>Recent</Text>
      </View>

      {/* Photo Grid */}
      {!loading ? (
        <FlatList
          data={photos}
          renderItem={renderPhoto}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={PostStyles.gridContainer}
          style={PostStyles.content}
        />
      ) : (
        <View style={PostStyles.loadingContainer}>
          <Text style={PostStyles.loadingText}>Loading photos...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MediaSelectionScreen;