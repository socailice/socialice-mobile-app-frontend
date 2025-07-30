import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../utils/styles/authStyles';
import mmkvStorage from '../utils/storage/MmkvStorage';
import colors from '../utils/styles/colors';
import { login } from './Api/AuthApi';

const LoginScreen = ({ setIsLoggedIn }) => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const result = await login(phone, password);

      if (result.success) {
        mmkvStorage.setItem('token', result.data);
        setIsLoggedIn(true);
        Alert.alert('Success', 'Login successful!');
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => {
    navigation.navigate('OTP');
  };

  return (
    <View style={StyleSheet.flatten([styles.authContainer])}>
      <Text style={StyleSheet.flatten([styles.authTitle])}>Login</Text>

      <TextInput
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        placeholderTextColor={colors.placeholderText}
        style={StyleSheet.flatten([styles.authTextInput])}
        keyboardType="phone-pad"
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
        disabled={loading}
      >
        <Text style={StyleSheet.flatten([styles.authButtonText])}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToSignup}>
        <Text style={StyleSheet.flatten([styles.authLinkText])}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;