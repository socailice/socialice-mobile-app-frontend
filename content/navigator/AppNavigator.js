import React, { useState, createContext, useContext } from 'react';
import LoginScreen from '../authentication/LoginScreen';
import SignupScreen from '../authentication/SignupScreen';
import OtpScreen from '../authentication/OtpScreen';
import HomeScreen from '../screens/HomeScreen';

const NavigationContext = createContext();

export const useNavigation = () => {
  return useContext(NavigationContext);
};

const AppNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('LOGIN');
  const [routeParams, setRouteParams] = useState({});

  const navigate = (screenName, params = {}) => {
    setRouteParams(params);
    setCurrentScreen(screenName);
  };

  const navigationValue = {
    navigate
  };

  const routeValue = {
    params: routeParams
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'LOGIN':
        return <LoginScreen />;
      case 'OTP':
        return <OtpScreen />;
      case 'SIGNUP':
        return <SignupScreen route={routeValue} />;
      case 'HOME':
        return <HomeScreen/>;
      default:
        return <LoginScreen />;
    }
  };

  return (
    <NavigationContext.Provider value={navigationValue}>
      {renderScreen()}
    </NavigationContext.Provider>
  );
};

export default AppNavigator;