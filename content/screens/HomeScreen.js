import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from '../utils/styles/HomeStyles';
import { globalFeed } from './api/GetApi';
import mmkvStorage from '../utils/storage/MmkvStorage';

const HomeScreen = ({ navigation }) => {
  const [feedData, setFeedData] = useState([]);
  const username = mmkvStorage.getItem('token')?.user?.username;

const handleHammerPress = useCallback(async (postId) => {
  console.log("username= ", username);

  console.log("DEBUG username:", mmkvStorage.getItem('token')); 

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

  try {
    const res = await fetch("http://10.0.2.2:8000/socialice/posts/hammer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        post_id: postId,
        username: username,   
        action: "add",        // SAANVI MODULAR
      }),
    });

    const data = await res.json();
    console.log("Hammer API response:", data);
  } catch (err) {
    console.error("Hammer API error:", err);
  }
}, []);


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

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await globalFeed();
        if (response?.success && Array.isArray(response.data)) {
          setFeedData(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch feed:', err);
      }
    };
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
        <View style={styles.postContent}>
          <Text style={styles.caption}>
            {item.caption || ''}
          </Text>
        </View>
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
    </View>
  );
};

export default HomeScreen;