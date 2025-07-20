// screens/HomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import HomeStyles from './styles/HomeStyles';
import Api from './api/Api';
import colors from '../components/styles/colors';

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
    <View style={HomeStyles.commentItem}>
      <Image
        source={{ uri: item.userDetails?.profilePic || 'https://via.placeholder.com/24' }}
        style={HomeStyles.commentProfilePic}
      />
      <View style={HomeStyles.commentContent}>
        <Text style={HomeStyles.commentText}>
          <Text style={HomeStyles.commentUsername}>
            {item.userDetails?.username || 'Unknown'}
          </Text>
          {' '}
          {item.text || ''}
        </Text>
        <Text style={HomeStyles.commentTime}>
          {formatTimeAgo(item.createdAt)}
        </Text>
      </View>
    </View>
  );

  const renderPost = ({ item }) => (
    <View style={HomeStyles.postContainer}>
      {/* Post Header */}
      <View style={HomeStyles.postHeader}>
        <View style={HomeStyles.userInfo}>
          <Image
            source={{ uri: item.user?.profilePic || 'https://via.placeholder.com/40' }}
            style={HomeStyles.profilePic}
          />
          <Text style={HomeStyles.username}>
            {item.user?.username || 'Unknown User'}
          </Text>
        </View>
        <TouchableOpacity 
          style={HomeStyles.dotsButton}
          onPress={() => handleDotsPress(item._id)}
        >
          <Text style={HomeStyles.dotsText}>•••</Text>
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <Image
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/400' }}
        style={HomeStyles.postImage}
        resizeMode="cover"
      />

      {/* Post Actions */}
      <View style={HomeStyles.postActions}>
        <TouchableOpacity 
          style={HomeStyles.hammerButton}
          onPress={() => handleHammerPress(item._id)}
        >
          <Text style={[
            HomeStyles.hammerIcon,
            item.hammers?.hammeredByCurrentUser 
              ? HomeStyles.hammerIconActive 
              : HomeStyles.hammerIconInactive
          ]}>
            🔨
          </Text>
          <Text style={HomeStyles.hammerCount}>
            {item.hammers?.count || 0}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Post Caption */}
      <View style={HomeStyles.postContent}>
        <Text style={HomeStyles.caption}>
          {item.caption || ''}
        </Text>
      </View>

      {/* Comments Preview */}
      {item.comments && item.comments.length > 0 && (
        <View style={HomeStyles.commentsSection}>
          <FlatList
            data={item.comments.slice(0, 2)}
            renderItem={renderComment}
            keyExtractor={(comment) => comment._id}
            scrollEnabled={false}
          />
          {item.comments.length > 2 && (
            <Text style={[HomeStyles.commentTime, { marginTop: 8 }]}>
              View all {item.comments.length} comments
            </Text>
          )}
        </View>
      )}
    </View>
  );

  return (
    <View style={HomeStyles.container}>
      <FlatList
        style={HomeStyles.feedContainer}
        data={feedData}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;
