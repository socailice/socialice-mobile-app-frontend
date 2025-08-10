import React from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import ProfileComponent from '../components/ProfileComponent';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostStyles from '../utils/styles/PostStyles';

const CubeProfileScreen = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const userId = route.params?.userId || props.userId;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={PostStyles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      
      <ProfileComponent userId={userId} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 10,
    alignSelf: 'flex-start',
  },
});

export default CubeProfileScreen;