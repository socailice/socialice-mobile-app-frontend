import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import mmkvStorage from '../utils/storage/MmkvStorage';
import { uploadImage } from '../utils/conifg/CloudinaryService';
import colors from '../utils/styles/colors';

const ProfilePhotoUpdateScreen = ({ navigation }) => {
  const tokenObj = mmkvStorage.getItem('token') || {};
  const currentUserId = tokenObj?.user?._id;
  
  const [localUri, setLocalUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 1, selectionLimit: 1 },
      (response) => {
        if (response?.didCancel || response?.errorCode) return;
        const uri = response?.assets?.[0]?.uri;
        if (uri) {
          setLocalUri(uri);
        }
      }
    );
  };

  //SAANVI
  const upload = async () => {
    if (!localUri) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    if (!currentUserId) {
      Alert.alert('Error', 'User ID not found. Please login again.');
      return;
    }
    
    try {
      setUploading(true);
      
      const cloudinaryUrl = await uploadImage(localUri);

      const BASE_URL = 'https://socialice-backend.onrender.com';
      const apiUrl = `${BASE_URL}/socialice/profile/profile/update-pic`;
      
      const requestPayload = {
        user_id: currentUserId,
        profilePic: cloudinaryUrl,
      };

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        
        if (response.status === 404) {
          throw new Error('API endpoint not found');
        } else if (response.status === 500) {
          throw new Error('Server error. Please try again later.');
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        throw new Error('Server returned HTML instead of JSON');
      }

      const data = await response.json();

      if (!data?.success) {
        throw new Error(data?.message || 'Update failed');
      }
      Alert.alert('Success', 'Profile photo updated successfully!', [
        { 
          text: 'OK', 
          onPress: () => navigation.goBack()
        },
      ]);

    } catch (error) {
      let message = 'Upload failed. Please try again.';
      
      if (error.message.includes('Network request failed')) {
        message = 'Network error. Check your connection.';
      } else if (error.message.includes('API endpoint not found')) {
        message = 'API endpoint not found. Check server URL.';
      } else if (error.message.includes('fetch')) {
        message = 'Connection error. Check your API URL.';
      } else if (error?.message) {
        message = error.message;
      }

      Alert.alert('Upload Failed', message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Profile Photo</Text>

      {localUri ? (
        <>
          <Image source={{ uri: localUri }} style={styles.preview} />
          <TouchableOpacity
            style={[styles.button, styles.primary]}
            onPress={upload}
            disabled={uploading}
          >
            {uploading ? (
              <ActivityIndicator color={colors.crystalWhite} />
            ) : (
              <Text style={styles.buttonText}>Upload</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={pickImage}
            disabled={uploading}
          >
            <Text style={styles.secondaryText}>Choose Another</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={[styles.button, styles.primary]} onPress={pickImage}>
            <Text style={styles.buttonText}>Choose Photo</Text>
          </TouchableOpacity>
          <Text style={styles.hint}>Pick an image to preview, then upload.</Text>
        </>
      )}

      <TouchableOpacity onPress={() => navigation.goBack()} disabled={uploading}>
        <Text style={styles.cancel}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    alignItems: 'center', 
    backgroundColor: colors.crystalWhite
  },
  title: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: colors.primaryText, 
    marginVertical: 16 
  },
  preview: { 
    width: 220, 
    height: 220, 
    borderRadius: 110, 
    marginVertical: 16 
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 12,
    backgroundColor: colors.snowWhite,
    borderWidth: 1,
    borderColor: colors.icyGray,
    minWidth: 180,
    alignItems: 'center',
  },
  primary: { 
    backgroundColor: colors.arcticBlue, 
    borderColor: colors.arcticBlue 
  },
  buttonText: { 
    color: colors.crystalWhite, 
    fontWeight: '700' 
  },
  secondaryText: { 
    color: colors.primaryText, 
    fontWeight: '600' 
  },
  hint: { 
    marginTop: 8, 
    color: colors.placeholderText 
  },
  cancel: { 
    marginTop: 18, 
    color: colors.arcticBlue, 
    fontWeight: '600' 
  },
});

export default ProfilePhotoUpdateScreen;