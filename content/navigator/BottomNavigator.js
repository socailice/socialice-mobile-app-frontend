import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import CubeScreen from '../screens/CubeScreen';
import ChatScreen from '../screens/ChatScreen';

import { NavigationContainer } from '@react-navigation/native';
import colors from '../components/styles/colors';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.crystalWhite,
          tabBarInactiveTintColor: colors.glacierBlue,
          tabBarStyle: {
            backgroundColor: colors.deepIce,
            borderTopColor: colors.shadowColor,
            height: 55,
            paddingBottom: 5,
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
            }

            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Post" component={PostScreen} />
        <Tab.Screen name="Cube" component={CubeScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigator;
