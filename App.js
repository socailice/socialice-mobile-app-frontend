import React, { useState } from 'react';
import AppNavigator from './content/navigator/AppNavigator';
import BottomNavigator from './content/navigator/BottomNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? (
    <BottomNavigator />
  ) : (
    <AppNavigator setIsLoggedIn={setIsLoggedIn} />
  );
}
