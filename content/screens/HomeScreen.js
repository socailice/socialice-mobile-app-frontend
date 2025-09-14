import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
// Import the useFocusEffect hook from React Navigation
import { useFocusEffect } from '@react-navigation/native';
import styles from '../utils/styles/HomeStyles';
import { globalFeed } from './api/GetApi';
import mmkvStorage from '../utils/storage/MmkvStorage';
import { hammerPost } from './api/PostApi';

const HomeScreen = ({ navigation }) => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const username = mmkvStorage.getItem('token')?.user?.username;

  const handleHammerPress = useCallback(async (postId) => {
    if (!username) {
      console.error("No username found in storage");
      return;
    }
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
    const result = await hammerPost(postId, username, "add");
    if (!result.success) {
      console.error("Hammer API error:", result.error);
    } 
  }, [username]);

  const handleCommentsPress = useCallback((postId) => {
    const postData = feedData.find(post => post._id === postId);
    const userToken = mmkvStorage.getItem('token');

    navigation.navigate('Comments', {
      postId: postId,
      comments: postData?.comments || [],
      currentUser: {
        _id: userToken?.user?._id,
        username: userToken?.user?.username,
        profilePic: userToken?.user?.profilePic
      }
    });
  }, [feedData, navigation]);

  const handleDotsPress = useCallback((postId) => {
    // Add your logic for handling dots press here
  }, []);

  const fetchFeed = async () => {
    try {
      if (!refreshing) setLoading(true);
      const response = await globalFeed();
      if (response?.success && Array.isArray(response.data)) {
        setFeedData(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch feed:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFeed();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFeed();
  }, []);

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

        {/* Caption */}
        <View style={styles.postContent}>
          <Text style={styles.caption}>
            {item.caption || ''}
          </Text>
        </View>

        {/* View Comments */}
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

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#00bcd4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.feedContainer}
        data={feedData}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#00bcd4"]} />
        }
      />
    </View>
  );
};

export default HomeScreen;

//SAANVI