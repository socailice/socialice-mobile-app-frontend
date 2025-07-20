import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '../navigator/AppNavigator';
import styles from '../components/styles/authStyles';

const OtpScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = () => {
    console.log('Sending OTP to:', phone);
    setOtpSent(true);
  };

  const verifyOtp = () => {
    console.log('Verifying OTP:', otp);
    navigation.navigate('Signup', { phone: phone });
  };

  return (
    <View style={StyleSheet.flatten([styles.authContainer])}>
      <Text style={StyleSheet.flatten([styles.authTitle])}>
        {otpSent ? 'Verify OTP' : 'Enter Phone Number'}
      </Text>
      
      {!otpSent ? (
        <>
          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            placeholderTextColor="grey"
            keyboardType="phone-pad"
            style={StyleSheet.flatten([styles.authTextInputLarge])}
          />
          
          <TouchableOpacity
            onPress={sendOtp}
            style={StyleSheet.flatten([styles.authButtonPrimary])}
          >
            <Text style={StyleSheet.flatten([styles.authButtonText])}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={StyleSheet.flatten([styles.authSubtitle])}>
            OTP sent to {phone}
          </Text>
          
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            placeholderTextColor="grey"
            keyboardType="numeric"
            style={StyleSheet.flatten([styles.authTextInputLarge])}
          />
          
          <TouchableOpacity
            onPress={verifyOtp}
            style={StyleSheet.flatten([styles.authButtonSuccess])}
          >
            <Text style={StyleSheet.flatten([styles.authButtonText])}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default OtpScreen;