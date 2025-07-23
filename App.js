import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './content/navigator/StackNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <StackNavigator setIsLoggedIn={setIsLoggedIn} />
    </NavigationContainer>
  );
}
