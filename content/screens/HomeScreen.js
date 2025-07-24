import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from '../utils/styles/HomeStyles';
import Comments from '../components/Comments';
import {globalFeed} from './api/Api';
import mmkvStorage from '../utils/storage/MmkvStorage';

const formatTimeAgo = (dateString) => {
  const now = new Date();
  const postDate = new Date(dateString);
  const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'now';
  if (diffInHours < 24) return `${diffInHours}h`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d`;
  
  return `${Math.floor(diffInDays / 7)}w`;
};

const HomeScreen = () => {
  const [feedData, setFeedData] = useState(globalFeed()?.data);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleHammerPress = useCallback((postId) => {
    setFeedData(prevData =>
      prevData.map(post => {
        if (post._id === postId) {
          return {
            ...post,
            hammers: {
              ...post.hammers,
              hammeredByCurrentUser: !post.hammers.hammeredByCurrentUser,
              count: post.hammers.hammeredByCurrentUser 
                ? post.hammers.count - 1 
                : post.hammers.count + 1
            }
          };
        }
        return post;
      })
    );
  }, []);

  const handleCommentsPress = useCallback((postId) => {
    setSelectedPostId(postId);
    setCommentsVisible(true);
  }, []);

  const handleAddComment = useCallback((postId, commentText) => {
    setFeedData(prevData =>
      prevData.map(post => {
        if (post._id === postId) {
          const newComment = {
            _id: `comment_${Date.now()}`,
            text: commentText,
            userDetails: {
              _id: "current_user",
              username: mmkvStorage.getItem('token')?.username,
              profilePic: "https://via.placeholder.com/32"
            },
            createdAt: new Date().toISOString()
          };
          
          return {
            ...post,
            comments: [...(post.comments || []), newComment]
          };
        }
        return post;
      })
    );
  }, []);

  const handleDotsPress = useCallback((postId) => {
    console.log('Dots pressed for post:', postId);
  }, []);

  const getSelectedPostComments = useMemo(() => {
    if (!selectedPostId) return [];
    const selectedPost = feedData.find(post => post._id === selectedPostId);
    return selectedPost?.comments || [];
  }, [feedData, selectedPostId]);

  const renderPost = useCallback(({ item }) => (
    <View style={styles.postSection}>
      <View style={styles.postContainer}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: item.user?.profilePic || 'https://via.placeholder.com/40' }}
              style={styles.profilePic}
            />
            <Text style={styles.username}>
              {item.user?.username || 'Unknown User'}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.dotsButton}
            onPress={() => handleDotsPress(item._id)}
          >
            <Text style={styles.dotsText}>•••</Text>
          </TouchableOpacity>
        </View>

        {/* Post Image */}
        <Image
          source={{ uri: item.imageUrl || 'https://via.placeholder.com/400' }}
          style={styles.postImage}
          resizeMode="cover"
        />

        {/* Post Actions */}
        <View style={styles.postActions}>
          <TouchableOpacity 
            style={styles.hammerButton}
            onPress={() => handleHammerPress(item._id)}
          >
            <Text style={[
              styles.hammerIcon,
              item.hammers?.hammeredByCurrentUser 
                ? styles.hammerIconActive 
                : styles.hammerIconInactive
            ]}>
              🔨
            </Text>
            <Text style={styles.hammerCount}>
              {item.hammers?.count || 0}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.commentsButton}
            onPress={() => handleCommentsPress(item._id)}
          >
            <Text style={styles.commentsIcon}>💬</Text>
            <Text style={styles.commentsCount}>
              {item.comments?.length || 0}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Post Caption */}
        <View style={styles.postContent}>
          <Text style={styles.caption}>
            {item.caption || ''}
          </Text>
        </View>

        {/* View Comments Link */}
        {item.comments && item.comments.length > 0 && (
          <View style={styles.viewCommentsSection}>
            <TouchableOpacity onPress={() => handleCommentsPress(item._id)}>
              <Text style={styles.viewCommentsText}>
                View all {item.comments.length} comments
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  ), [handleDotsPress, handleHammerPress, handleCommentsPress]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.feedContainer}
        data={feedData}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />

      <Comments
        isVisible={commentsVisible}
        onClose={() => setCommentsVisible(false)}
        comments={getSelectedPostComments}
        onAddComment={handleAddComment}
        postId={selectedPostId}
      />
    </View>
  );
};

export default HomeScreen;