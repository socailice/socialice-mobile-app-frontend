import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Add this import
import Ionicons from 'react-native-vector-icons/Ionicons';
import TopBar from '../components/TopBar';
import HomeScreen from '../screens/HomeScreen';
import CubeScreen from '../screens/CubeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../utils/styles/colors';

import mmkvStorage from '../utils/storage/MmkvStorage';

const Tab = createBottomTabNavigator();

const PostButton = ({ navigation, route }) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const currentTab = route.name;
      navigation.navigate('PostFlow', { 
        screen: 'MediaSelection',
        params: { returnTo: currentTab }
      });
    });
    return unsubscribe;
  }, [navigation, route]);
  
  return <View style={{ flex: 1, backgroundColor: colors.crystalWhite }} />;
};

const BottomNavigator = () => {
  const [userId, setUserId] = useState(null);
  const insets = useSafeAreaInsets(); 

  const handleTabPress = useCallback(() => {
    const newUserId = mmkvStorage.getItem('token')?.user?._id;
    setUserId(newUserId);
  }, []);

  useEffect(() => {
    const initialUserId = mmkvStorage.getItem('token')?.user?._id;
    setUserId(initialUserId);
  }, []);

  const ProfileScreenWrapper = (props) => {
    return <ProfileScreen {...props} userId={userId} />;
  };

  return (
    <View style={styles.container}>
      <TopBar />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.crystalWhite,
          tabBarInactiveTintColor: colors.glacierBlue,
          tabBarStyle: {
            backgroundColor: colors.deepIce,
            borderTopColor: colors.shadowColor,
            height: 55 + insets.bottom, 
            paddingBottom: 5 + insets.bottom,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home-outline';
                break;
              case 'Post':
                iconName = 'create-outline';
                break;
              case 'Cube':
                iconName = 'cube-outline';
                break;
              case 'Chat':
                iconName = 'chatbubble-ellipses-outline';
                break;
              case 'Profile':
                iconName = 'person-outline';
                break;
            }

            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
        screenListeners={{
          tabPress: handleTabPress,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cube" component={CubeScreen} />
        <Tab.Screen name="Post" component={PostButton} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Profile" component={ProfileScreenWrapper} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.crystalWhite,
  },
});

export default BottomNavigator;