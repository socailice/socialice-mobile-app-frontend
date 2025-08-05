import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostStyles from '../../utils/styles/PostStyles';
import { uploadImage } from '../../utils/conifg/CloudinaryService';

const PostCaptionScreen = ({ navigation, route }) => {
  const { imageData } = route.params;
  const [caption, setCaption] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleBack = () => {
    navigation.pop(2);
  };
const handlePost = async () => {
  setIsPosting(true);
  
  try {
    console.log('Image URI:', imageData.path || imageData.uri);
    
    const imageUrl = await uploadImage(imageData.uri || imageData.path);
    console.log('Image uploaded successfully:', imageUrl);
          
    const postData = {
      caption: caption,
      imageUrl: imageUrl,
    };
    
    Alert.alert('Success', 'Your post has been shared successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('Main') }
    ]);
    
  } catch (error) {
    console.error('Upload failed:', error);
    
    let message = 'Upload failed. Please try again.';
    
    try {
      if (error && typeof error === 'object') {
        if (typeof error.message === 'string') {
          message = error.message;
        } else if (error.message && typeof error.message === 'object') {
          message = 'Upload failed. Please check your connection and try again.';
        } else if (typeof error === 'string') {
          message = error;
        }
      }
    } catch (stringifyError) {
      console.error('Error while processing error message:', stringifyError);
      message = 'Upload failed. Please try again.';
    }
    
    Alert.alert('Upload Failed', message);
  } finally {
    setIsPosting(false);
  }
};

  return (
    <SafeAreaView style={PostStyles.container}>
      <KeyboardAvoidingView 
        style={PostStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={PostStyles.header}>
          <TouchableOpacity style={PostStyles.headerButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={PostStyles.headerTitle}>New Post</Text>
          <TouchableOpacity 
            style={PostStyles.headerButton}
            onPress={handlePost}
            disabled={isPosting}
          >
            <Text style={[
              PostStyles.headerButtonText,
              isPosting && PostStyles.headerButtonDisabled
            ]}>
              {isPosting ? 'Uploading...' : 'Post'}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={PostStyles.content}>
          <View style={PostStyles.postRow}>
            <Image 
              source={{ uri: imageData.path || imageData.uri }} 
              style={PostStyles.thumbnail} 
            />
            <TextInput
              style={PostStyles.captionInput}
              placeholder="Write a caption..."
              placeholderTextColor="#999"
              value={caption}
              onChangeText={setCaption}
              multiline
              maxLength={280}
            />
          </View>
          <View style={PostStyles.characterCount}>
            <Text style={PostStyles.characterCountText}>
              {caption.length}/280
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PostCaptionScreen;