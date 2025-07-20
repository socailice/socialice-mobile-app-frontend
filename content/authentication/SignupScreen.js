import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '../navigator/AppNavigator';
import styles from '../components/styles/authStyles';
import colors from '../components/styles/colors';

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
      phone: phone,
    };

    console.log('Signup payload:', payload);
    Alert.alert('Signup', 'User registered successfully');
    navigation.navigate('LOGIN');
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
      >
        <Text style={StyleSheet.flatten([styles.authButtonText])}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('LOGIN');
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
