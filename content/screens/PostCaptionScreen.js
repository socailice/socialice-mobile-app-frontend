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
import PostStyles from '../utils/styles/PostStyles';

const PostCaptionScreen = ({ navigation, route }) => {
  const { imageData } = route.params;
  const [caption, setCaption] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  // Navigation Functions
  const handleBack = () => {
    navigation.pop(2); // Go back 2 screens to MediaSelection
  };

  const handlePost = async () => {
    setIsPosting(true);
    
    // Simulate posting
    setTimeout(() => {
      Alert.alert(
        'Posted!', 
        'Your post has been shared successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Main')
          }
        ]
      );
      setIsPosting(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={PostStyles.container}>
      <KeyboardAvoidingView 
        style={PostStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
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
              {isPosting ? 'Posting...' : 'Post'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={PostStyles.content}>
          {/* Post Composition */}
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