import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import LoginScreen from '../authentication/LoginScreen';
import OtpScreen from '../authentication/OtpScreen';
import SignupScreen from '../authentication/SignupScreen';
import BottomNavigator from './BottomNavigator';
import MessageScreen from '../screens/MessageScreen';
import MediaSelectionScreen from '../screens/PostScreen/MediaSelectionScreen';
import ImageCropScreen from '../screens/PostScreen/ImageCropScreen';
import PostCaptionScreen from '../screens/PostScreen/PostCaptionScreen';
import CubeProfileScreen from '../screens/CubeProfileScreen';
import ProfilePhotoUpdateScreen from '../components/ProfilePhotoUpdateScreen';
import CommentsScreen from '../components/Comments';

const Stack = createStackNavigator();

const resetToLogin = (navigation) => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'Login' }],
  });
};

// Post Flow Stack Navigator
const PostFlowNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <Stack.Screen name="MediaSelection" component={MediaSelectionScreen} />
    <Stack.Screen name="ImageCrop" component={ImageCropScreen} />
    <Stack.Screen name="PostCaption" component={PostCaptionScreen} />
  </Stack.Navigator>
);

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
      <Stack.Screen name="CubeProfile" component={CubeProfileScreen} /> 
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
      
      {/* Post Flow Stack */}
      <Stack.Screen
        name="PostFlow"
        component={PostFlowNavigator}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
  name="Comments" 
  component={CommentsScreen}
  options={{
    headerShown: false, 
    presentation: 'card',
  }}
/>
      <Stack.Screen name="ProfilePhotoUpdate" component={ProfilePhotoUpdateScreen} />


    </Stack.Navigator>
  );
};

export default StackNavigator;