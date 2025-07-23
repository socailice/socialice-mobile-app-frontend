import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../authentication/LoginScreen';
import OtpScreen from '../authentication/OtpScreen';
import SignupScreen from '../authentication/SignupScreen';

const Stack = createStackNavigator();

const MainNavigator = ({ setIsLoggedIn }) => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="OTP" component={OtpScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
