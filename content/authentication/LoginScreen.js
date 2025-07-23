import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../utils/styles/authStyles';
import mmkvStorage from '../utils/storage/MmkvStorage';
import colors from '../utils/styles/colors';

const LoginScreen = ({ setIsLoggedIn }) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const payload = {
      username: username,
      password: password
    };
    console.log('Login payload:', payload);
    mmkvStorage.setItem('token', payload);
    setIsLoggedIn(true); // trigger bottom navigator
  };

  const goToSignup = () => {
    navigation.navigate('OTP');
  };

  return (
    <View style={StyleSheet.flatten([styles.authContainer])}>
      <Text style={StyleSheet.flatten([styles.authTitle])}>Login</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={colors.placeholderText}
        style={StyleSheet.flatten([styles.authTextInput])}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={colors.placeholderText}
        secureTextEntry
        style={StyleSheet.flatten([styles.authTextInput])}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={StyleSheet.flatten([styles.authButtonPrimary])}
      >
        <Text style={StyleSheet.flatten([styles.authButtonText])}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToSignup}>
        <Text style={StyleSheet.flatten([styles.authLinkText])}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
