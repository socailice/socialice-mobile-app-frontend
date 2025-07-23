import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './content/navigator/StackNavigator';
import BottomNavigator from './content/navigator/BottomNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <BottomNavigator />
      ) : (
        <StackNavigator setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
}
