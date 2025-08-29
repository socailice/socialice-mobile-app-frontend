import React from 'react';
import {
  View,
  Text,
  SafeAreaView
} from 'react-native';

const CommentsScreen = ({ route, navigation }) => {
  const { postId, comments = [], currentUser } = route.params || {};
  
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Comments</Text>
    </SafeAreaView>
  );
};

export default CommentsScreen;