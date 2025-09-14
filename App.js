import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './content/navigator/StackNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator setIsLoggedIn={setIsLoggedIn} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}