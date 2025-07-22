import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  useWindowDimensions
} from 'react-native';
import Modal from 'react-native-modal';
import styles from '../utils/styles/CommentStyles';

const formatTimeAgo = (dateString) => {
  const now = new Date();
  const commentDate = new Date(dateString);
  const diffInHours = Math.floor((now - commentDate) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'now';
  if (diffInHours < 24) return `${diffInHours}h`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d`;
  
  return `${Math.floor(diffInDays / 7)}w`;
};

const Comments = ({ 
  isVisible, 
  onClose, 
  comments = [], 
  onAddComment,
  postId 
}) => {
  const [newComment, setNewComment] = useState('');
  const { height: screenHeight } = useWindowDimensions();
  const modalHeight = screenHeight * 0.75; // 3/4 of screen height

  const handleAddComment = useCallback(() => {
    if (newComment.trim()) {
      onAddComment(postId, newComment.trim());
      setNewComment('');
    }
  }, [newComment, onAddComment, postId]);

  const renderComment = useCallback(({ item }) => (
    <View style={styles.commentItem}>
      <Image
        source={{ uri: item.userDetails?.profilePic || 'https://via.placeholder.com/32' }}
        style={styles.commentProfilePic}
      />
      <View style={styles.commentContent}>
        <Text style={styles.commentText}>
          <Text style={styles.commentUsername}>
            {item.userDetails?.username || 'Unknown'}
          </Text>
          {' '}
          {item.text || ''}
        </Text>
        <Text style={styles.commentTime}>
          {formatTimeAgo(item.createdAt)}
        </Text>
      </View>
    </View>
  ), []);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      style={styles.modal}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1, justifyContent: 'flex-end' }}
        keyboardVerticalOffset={0}
      >
        <View style={[styles.container, { height: modalHeight }]}>
          <SafeAreaView style={styles.safeArea}>
            {/* Handle Bar */}
            <View style={styles.handleBar} />
            
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Comments</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Comments List */}
            <FlatList
              data={comments}
              renderItem={renderComment}
              keyExtractor={(item) => item._id}
              style={styles.commentsList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.commentsContent}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No comments yet</Text>
                  <Text style={styles.emptySubText}>Be the first to comment!</Text>
                </View>
              }
            />

            {/* Add Comment Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Add a comment..."
                placeholderTextColor={styles.placeholderColor.color}
                value={newComment}
                onChangeText={setNewComment}
                multiline={true}
                maxLength={500}
              />
              <TouchableOpacity 
                style={[
                  styles.sendButton,
                  newComment.trim() ? styles.sendButtonActive : styles.sendButtonInactive
                ]}
                onPress={handleAddComment}
                disabled={!newComment.trim()}
              >
                <Text style={[
                  styles.sendButtonText,
                  newComment.trim() ? styles.sendButtonTextActive : styles.sendButtonTextInactive
                ]}>
                  Post
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default React.memo(Comments);