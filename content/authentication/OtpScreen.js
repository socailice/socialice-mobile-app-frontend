import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '../navigator/AppNavigator';
import styles from '../utils/styles/authStyles';
import colors from '../utils/styles/colors';

const OtpScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const handlePhoneChange = text => {
    if (text.length <= 10) {
      setPhone(text);
    }
  };
  const goToLogin = () => {
    navigation.navigate('LOGIN');
  };
  const sendOtp = () => {
    if (phone.length < 10) {
      setPhoneError('Phone number must be 10 digits');
      return;
    }
    setPhoneError('');
    console.log('Sending OTP to:', phone);
    setOtpSent(true);
  };

  const verifyOtp = () => {
    console.log('Verifying OTP:', otp);
    navigation.navigate('SIGNUP', { phone: phone });
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
            onChangeText={handlePhoneChange}
            placeholderTextColor={colors.placeholderText}
            keyboardType="phone-pad"
            maxLength={10}
            style={StyleSheet.flatten([styles.authTextInput])}
          />

          <TouchableOpacity
            onPress={sendOtp}
            style={StyleSheet.flatten([styles.authButtonPrimary])}
          >
            <Text style={StyleSheet.flatten([styles.authButtonText])}>
              Send OTP
            </Text>
          </TouchableOpacity>

          {phoneError ? (
            <Text style={StyleSheet.flatten([styles.authErrorText])}>
              {phoneError}
            </Text>
          ) : null}

          <TouchableOpacity onPress={goToLogin}>
            <Text style={StyleSheet.flatten([styles.authLinkText])}> back</Text>
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
            placeholderTextColor={colors.placeholderText}
            keyboardType="numeric"
            style={StyleSheet.flatten([styles.authTextInput])}
          />

          <TouchableOpacity
            onPress={verifyOtp}
            style={StyleSheet.flatten([styles.authButtonSuccess])}
          >
            <Text style={StyleSheet.flatten([styles.authButtonText])}>
              Verify OTP
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setOtpSent(false);
            }}
          >
            <Text style={StyleSheet.flatten([styles.authLinkText])}> back</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default OtpScreen;
