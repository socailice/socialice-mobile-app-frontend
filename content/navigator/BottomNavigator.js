import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TopBar from '../components/TopBar';
import HomeScreen from '../screens/HomeScreen';
import CubeScreen from '../screens/CubeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../utils/styles/colors';

const Tab = createBottomTabNavigator();

// Simple component that navigates to post flow when mounted
const PostButton = ({ navigation, route }) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Get the current tab name from the parent navigator
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
              case 'Profile':
                iconName = 'person-outline';
                break;
            }

            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cube" component={CubeScreen} />
        <Tab.Screen name="Post" component={PostButton} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
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