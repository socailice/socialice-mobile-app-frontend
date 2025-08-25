import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ChatStyles from '../utils/styles/ChatStyles';
import mmkvStorage from '../utils/storage/MmkvStorage';
import { fetchChats } from './api/GetApi';

const ChatScreen = ({ navigation }) => {
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUsername = mmkvStorage.getItem('token')?.user?.username || '';

  async function loadChats() {
    try {
      if (!currentUsername) return;
      
      setLoading(true);
      const chats = await fetchChats(currentUsername);
      setChatList(chats);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch chats');
      console.error('Chat fetch error:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadChats();
  }, [currentUsername]);

  useFocusEffect(
    useCallback(() => {
      loadChats();
    }, [currentUsername])
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

  return (
    <View style={ChatStyles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={chatList || []}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default ChatScreen;