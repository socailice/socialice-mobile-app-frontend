import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Alert,
  TextInput,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import colors from '../utils/styles/colors';

const { width } = Dimensions.get('window');
const PREVIEW_HEIGHT = width;

const PostScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');

  // Request camera permission for Android
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to camera to take photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const showMediaOptions = () => {
    Alert.alert(
      'Add Media',
      'Choose an option',
      [
        { text: 'Camera', onPress: openCamera },
        { text: 'Gallery', onPress: openGallery },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera permission is required to take photos');
      return;
    }

    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 2000,
      maxHeight: 2000,
    };

    launchCamera(options, (response) => {
      if (response.didCancel || response.errorCode) return;
      
      if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 2000,
      maxHeight: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.errorCode) return;
      
      if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  const createPost = () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please select an image first');
      return;
    }

    const postPayload = {
      userId: 'user123',
      caption: caption || 'Check this out! 🔥',
      media: {
        uri: selectedImage.uri,
        type: selectedImage.type,
        fileName: selectedImage.fileName,
        fileSize: selectedImage.fileSize,
      },
      timestamp: new Date().toISOString(),
    };

    console.log('Post Payload:', postPayload);
    
    // Reset after posting
    setCaption('');
    setSelectedImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity onPress={createPost}>
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Preview Area */}
      {selectedImage ? (
        <Image source={{ uri: selectedImage.uri }} style={styles.preview} />
      ) : (
        <View style={[styles.preview, styles.placeholderPreview]}>
          <Text style={styles.placeholderText}>No image selected</Text>
        </View>
      )}

      {/* Caption Input */}
      <View style={styles.captionSection}>
        <TextInput
          style={styles.captionInput}
          placeholder="Write a caption..."
          placeholderTextColor={colors.placeholderText}
          value={caption}
          onChangeText={setCaption}
          multiline
          maxLength={280}
        />
      </View>

      {/* Camera Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cameraButton} onPress={showMediaOptions}>
          <Text style={styles.cameraButtonText}>📷 Add Photo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.snowWhite,
  },
  header: {
    height: 50,
    backgroundColor: colors.icyBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomColor: colors.icyGray,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    color: colors.primaryText,
    fontWeight: '600',
  },
  postButton: {
    fontSize: 16,
    color: colors.arcticBlue,
    fontWeight: 'bold',
  },
  preview: {
    width: width,
    height: PREVIEW_HEIGHT,
    backgroundColor: colors.icyGray,
  },
  placeholderPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: colors.placeholderText,
    fontSize: 16,
  },
  captionSection: {
    backgroundColor: colors.crystalWhite,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: colors.icyGray,
    borderBottomWidth: 1,
  },
  captionInput: {
    fontSize: 16,
    color: colors.primaryText,
    minHeight: 40,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    padding: 20,
    alignItems: 'center',
  },
  cameraButton: {
    backgroundColor: colors.frostBlue,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
  },
  cameraButtonText: {
    color: colors.whiteText,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PostScreen;