// screens/ChatScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import ChatStyles from '../utils/styles/ChatStyles';
import { ChatScreenApi } from './api/Api';


const ChatScreen = ({ navigation }) => {
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
      <FlatList
        data={ChatScreenApi()?.data || []}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default ChatScreen;
