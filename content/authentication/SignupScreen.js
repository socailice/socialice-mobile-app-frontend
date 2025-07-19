// content/authentication/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '../navigator/AppNavigator';

const SignupScreen = ({ route }) => {
  const navigation = useNavigation();
  const { phone } = route.params;
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');

    const payload = {
      fullname: fullname,
      username: username,
      password: password,
      phone: phone
    };
    
    console.log('Signup payload:', payload);
    Alert.alert('Signup', 'User registered successfully');
    navigation.navigate('Login');
  };

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 , backgroundColor:'white'}}>
      <Text style={{ fontSize: 24, marginBottom: 30, textAlign: 'center' }}>Sign Up</Text>
      
      <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Phone Number</Text>
      <TextInput
        value={phone}
        editable={false}
        style={{ 
          borderWidth: 1, 
          padding: 10, 
          marginBottom: 15, 
          borderRadius: 5, 
          backgroundColor: '#f0f0f0',
          color: '#666'
        }}
      />
      
      <TextInput
        placeholder="Full Name"
        value={fullname}
        onChangeText={setFullname}
        placeholderTextColor="grey"
        style={{ borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 }}
      />
      
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
        color="black"
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 }}
      />
      
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="grey"
        onBlur={validatePassword}
        color="black"
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }}
      />
      
      {passwordError ? (
        <Text style={{ color: 'red', marginBottom: 15, textAlign: 'center' }}>
          {passwordError}
        </Text>
      ) : null}
      
      <TouchableOpacity
        onPress={handleSignup}
        style={{ backgroundColor: 'green', padding: 15, borderRadius: 5 }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;