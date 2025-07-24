// screens/MessageScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import colors from '../utils/styles/colors';

const MessageScreen = ({ route }) => {
  const { userId, name, avatar } = route.params;

  const [messages, setMessages] = useState([
    { id: '1', text: 'Hey!', sender: 'them' },
    { id: '2', text: 'What’s up?', sender: 'them' },
    { id: '3', text: 'All good, you?', sender: 'me' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: input, sender: 'me' },
    ]);
    setInput('');
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'me' ? styles.myMessage : styles.theirMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholder="Type a message"
          placeholderTextColor={colors.placeholderText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.crystalWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.frostBlue,
    padding: 14,
    elevation: 3,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.whiteText,
  },
  chatContainer: {
    padding: 12,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 10,
    marginVertical: 4,
    borderRadius: 16,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.softMint,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.iceBlue,
  },
  messageText: {
    color: colors.primaryText,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.snowWhite,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.icyGray,
    alignItems: 'center',
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
  },
  sendButton: {
    backgroundColor: colors.arcticBlue,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
});

export default MessageScreen;