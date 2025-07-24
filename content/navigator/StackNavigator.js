import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import LoginScreen from '../authentication/LoginScreen';
import OtpScreen from '../authentication/OtpScreen';
import SignupScreen from '../authentication/SignupScreen';
import BottomNavigator from './BottomNavigator';
import MessageScreen from '../screens/MessageScreen';


const Stack = createStackNavigator();

const resetToLogin = (navigation) => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'Login' }],
  });
};

const StackNavigator = ({ setIsLoggedIn }) => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Login">
        {(props) => (
          <LoginScreen
            {...props}
            setIsLoggedIn={() => {
              setIsLoggedIn(true);
              props.navigation.replace('Main');
            }}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="OTP" component={OtpScreen} />
      <Stack.Screen name="SignUp">
        {(props) => (
          <SignupScreen
            {...props}
            resetToLogin={() => resetToLogin(props.navigation)}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Main"
        component={BottomNavigator}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
        }}
      />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />

    </Stack.Navigator>
  );
};

export default StackNavigator;
