import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from '../utils/styles/HomeStyles';
import Api from './api/Api';

const HomeScreen = () => {
  const [feedData, setFeedData] = useState(Api.globalFeed.data);

  const handleHammerPress = (postId) => {
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
  };

  const handleDotsPress = (postId) => {
    console.log('Dots pressed for post:', postId);
  };

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

  const renderComment = ({ item }) => (
    <View style={styles.commentItem}>
      <Image
        source={{ uri: item.userDetails?.profilePic || 'https://via.placeholder.com/24' }}
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
  );

  const renderPost = ({ item }) => (
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
        </View>

        {/* Post Caption */}
        <View style={styles.postContent}>
          <Text style={styles.caption}>
            {item.caption || ''}
          </Text>
        </View>

        {/* Comments Preview */}
        {item.comments && item.comments.length > 0 && (
          <View style={styles.commentsSection}>
            <FlatList
              data={item.comments.slice(0, 2)}
              renderItem={renderComment}
              keyExtractor={(comment) => comment._id}
              scrollEnabled={false}
            />
            {item.comments.length > 2 && (
              <Text style={[styles.commentTime, { marginTop: 8 }]}>
                View all {item.comments.length} comments
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.feedContainer}
        data={feedData}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;