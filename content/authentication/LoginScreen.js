// content/authentication/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '../navigator/AppNavigator';

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
    Alert.alert('Login', 'Login successful');
  };

  const goToSignup = () => {
    navigation.navigate('OTP');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor:'white' }}>
      <Text style={{ fontSize: 24, marginBottom: 30, textAlign: 'center' }}>Login</Text>
      
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="grey"
        style={{ borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 }}
      />
      
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="grey"
        secureTextEntry
        color="black"
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 }}
      />
      
      <TouchableOpacity
        onPress={handleLogin}
        style={{ backgroundColor: 'blue', padding: 15, borderRadius: 5, marginBottom: 15 }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={goToSignup}>
        <Text style={{ textAlign: 'center', color: 'blue' }}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;