import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '../navigator/AppNavigator';
import styles from '../components/styles/authStyles';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const payload = {
      username: username,
      password: password
    };
    console.log('Login payload:', payload);
    navigation.navigate('HOME');
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
        placeholderTextColor="grey"
        style={StyleSheet.flatten([styles.authTextInput])}
      />
      
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="grey"
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