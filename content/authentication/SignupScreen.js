import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '../navigator/AppNavigator';
import styles from '../components/styles/authStyles';

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
    <View style={StyleSheet.flatten([styles.authContainer])}>
      <Text style={StyleSheet.flatten([styles.authTitle])}>Sign Up</Text>
      
      <Text style={StyleSheet.flatten([styles.authLabel])}>Phone Number</Text>
      <TextInput
        value={phone}
        editable={false}
        style={StyleSheet.flatten([styles.authTextInputDisabled])}
      />
      
      <TextInput
        placeholder="Full Name"
        value={fullname}
        onChangeText={setFullname}
        placeholderTextColor="grey"
        style={StyleSheet.flatten([styles.authTextInput])}
      />
      
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
      
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="grey"
        onBlur={validatePassword}
        secureTextEntry
        style={StyleSheet.flatten([styles.authTextInputError])}
      />
      
      {passwordError ? (
        <Text style={StyleSheet.flatten([styles.authErrorText])}>
          {passwordError}
        </Text>
      ) : null}
      
      <TouchableOpacity
        onPress={handleSignup}
        style={StyleSheet.flatten([styles.authButtonSuccess])}
      >
        <Text style={StyleSheet.flatten([styles.authButtonText])}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;