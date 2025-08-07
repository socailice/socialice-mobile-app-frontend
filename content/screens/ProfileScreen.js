import React from 'react';
import ProfileComponent from '../components/ProfileComponent';
import { useRoute } from '@react-navigation/native';

const ProfileScreen = (props) => {
  const route = useRoute();
  const userId = route.params?.userId || props.userId;


  return <ProfileComponent userId={userId} />;
};

export default ProfileScreen;