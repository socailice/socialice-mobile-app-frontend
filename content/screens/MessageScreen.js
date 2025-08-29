import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../utils/styles/colors';
import mmkvStorage from '../utils/storage/MmkvStorage';

const MessageScreen = ({ route }) => {
  const { userId, name, avatar } = route.params || {};
  const tokenData = mmkvStorage.getItem('token') || {};
  const currentUsername = tokenData?.user?.username || '';

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const ws = useRef(null);
  const messageIds = useRef(new Set());

  const formatTimestamp = timestamp => {
    const date = new Date(timestamp || Date.now());
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const addMessage = newMessage => {
    if (!messageIds.current.has(newMessage?.id)) {
      messageIds.current.add(newMessage?.id);
      setMessages(prev => [...prev, newMessage]);
    }
  };

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const url = `http://10.0.2.2:8000/socialice/chat/daily?sender_username=${currentUsername}&receiver_username=${name}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${tokenData?.access_token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch messages');
      
      const data = await response.json();
      setMessages([]);
      messageIds.current.clear();
      
      const formattedMessages = (data || []).map(msg => ({
        id: msg?.id?.toString() || Date.now().toString(),
        text: msg?.message || '',
        sender: msg?.sender_username || '',
        timestamp: msg?.timestamp || new Date().toISOString(),
        isRead: msg?.is_read || false,
      }));
      
      formattedMessages.forEach(msg => messageIds.current.add(msg.id));
      setMessages(formattedMessages);
    } catch (error) {
      Alert.alert('Error', 'Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessageAPI = async messageText => {
    const response = await fetch('http://10.0.2.2:8000/socialice/chat/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenData?.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender_username: currentUsername,
        receiver_username: name,
        message: messageText,
      }),
    });
    
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
  };

  const connectWebSocket = () => {
    if (!currentUsername || ws.current?.readyState === WebSocket.OPEN) return;

    ws.current = new WebSocket(
      `ws://10.0.2.2:8000/socialice/chat/ws/chat/${currentUsername}`,
    );

    ws.current.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        if (data?.type === 'message') {
          addMessage({
            id: data?.id || Date.now().toString(),
            text: data?.message || '',
            sender: data?.sender_username || '',
            timestamp: data?.timestamp || new Date().toISOString(),
            isRead: data?.is_read || false,
          });
        }
      } catch (error) {
        console.log('WebSocket message error:', error);
      }
    };

    ws.current.onclose = () => {
      setTimeout(connectWebSocket, 3000);
    };
  };

  const sendMessage = async () => {
    const messageText = input.trim();
    if (!messageText) return;

    const tempMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: currentUsername,
      timestamp: new Date().toISOString(),
      isRead: false,
      isPending: true,
    };

    addMessage(tempMessage);
    setInput('');

    try {
      await sendMessageAPI(messageText);
      
      // Send via WebSocket if connected
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({
          type: 'message',
          sender_username: currentUsername,
          receiver_username: name,
          message: messageText,
        }));
      }

      // Update message status
      setMessages(prev =>
        prev.map(msg =>
          msg.id === tempMessage.id ? { ...msg, isPending: false } : msg,
        ),
      );
    } catch (error) {
      // Remove failed message
      setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
      messageIds.current.delete(tempMessage.id);
      Alert.alert('Error', 'Failed to send message');
    }
  };

  useEffect(() => {
    fetchMessages();
    connectWebSocket();
    return () => ws.current?.close();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      connectWebSocket();
    }, []),
  );

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item?.sender === currentUsername ? styles.myMessage : styles.theirMessage,
      ]}
    >
      <Text style={styles.messageText}>{item?.text}</Text>
      <View style={styles.messageFooter}>
        <Text style={styles.timestamp}>{formatTimestamp(item?.timestamp)}</Text>
        {item?.sender === currentUsername && (
          <Text style={styles.messageStatus}>
            {item?.isPending ? '⏳' : item?.isRead ? '✓✓' : '✓'}
          </Text>
        )}
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.name}>{name || 'User'}</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item?.id}
        style={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={colors.placeholderText}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!input.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.crystalWhite 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.crystalWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.frostBlue,
    padding: 14,
  },
  avatar: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginRight: 12 
  },
  name: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: colors.whiteText 
  },
  messagesList: { 
    flex: 1, 
    padding: 12 
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    marginVertical: 4,
    borderRadius: 16,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.softMint,
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.iceBlue,
    borderBottomLeftRadius: 4,
  },
  messageText: { 
    color: colors.primaryText, 
    fontSize: 16, 
    lineHeight: 22 
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  timestamp: { 
    fontSize: 10, 
    color: colors.primaryText, 
    opacity: 0.6 
  },
  messageStatus: {
    fontSize: 10,
    color: colors.primaryText,
    opacity: 0.6,
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.snowWhite,
    padding: 10,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: colors.crystalWhite,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.primaryText,
    borderWidth: 1,
    borderColor: colors.icyGray,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: colors.arcticBlue,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: 'center',
    minHeight: 40,
  },
  sendButtonDisabled: { 
    backgroundColor: colors.icyGray, 
    opacity: 0.6 
  },
  sendButtonText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
});

export default MessageScreen;