import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ChatStyles from '../utils/styles/ChatStyles';
import mmkvStorage from '../utils/storage/MmkvStorage';
import { fetchChats } from './api/GetApi';

const ChatScreen = ({ navigation }) => {
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const currentUsername = mmkvStorage.getItem('token')?.user?.username || '';

  const loadChats = async (isRefresh = false) => {
    try {
      if (!currentUsername) return;
      
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      const chats = await fetchChats(currentUsername);
      setChatList(chats);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch chats');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => loadChats(true);

  useEffect(() => {
    loadChats();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadChats();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={ChatStyles.chatItem}
      onPress={() =>
        navigation.navigate('MessageScreen', {
          userId: item?.id,
          name: item?.name,
          avatar: item?.avatar,
        })
      }
    >
      <Image source={{ uri: item?.avatar }} style={ChatStyles.avatar} />
      <View style={ChatStyles.chatInfo}>
        <Text style={ChatStyles.chatName}>{item?.name}</Text>
        <Text style={ChatStyles.lastMessage}>{item?.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={ChatStyles.container}>
      <FlatList
        data={chatList}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default ChatScreen;