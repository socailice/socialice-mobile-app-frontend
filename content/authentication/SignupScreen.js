import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../utils/styles/authStyles';
import colors from '../utils/styles/colors';
import { signup } from './Api/AuthApi';

const SignupScreen = ({ route, resetToLogin }) => {
  const navigation = useNavigation();
  const { phone } = route.params;
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');

    if (!fullname.trim() || !username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const result = await signup(fullname.trim(), username.trim(), password, phone);
      
      if (result.success) {
        Alert.alert(
          'Signup', 
          'User registered successfully',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login')
            }
          ]
        );
      } else {
        Alert.alert('Signup Failed', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
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
        placeholderTextColor={colors.placeholderText}
        style={StyleSheet.flatten([styles.authTextInput])}
      />
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
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor={colors.placeholderText}
        onBlur={validatePassword}
        secureTextEntry
        style={StyleSheet.flatten([styles.authTextInput])}
      />
      {passwordError ? (
        <Text style={StyleSheet.flatten([styles.authErrorText])}>
          {passwordError}
        </Text>
      ) : null}
      <TouchableOpacity
        onPress={handleSignup}
        style={StyleSheet.flatten([styles.authButtonSuccess])}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={StyleSheet.flatten([styles.authButtonText])}>Sign Up</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (typeof resetToLogin === 'function') {
            resetToLogin(); // This clears the stack and goes to Login
          } else {
            navigation.navigate('Login'); // fallback
          }
        }}
      >
        <Text style={StyleSheet.flatten([styles.authLinkText])}>
          {' '}
          Already have an account? Log in
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;