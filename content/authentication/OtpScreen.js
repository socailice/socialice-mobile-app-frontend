// content/authentication/OtpScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '../navigator/AppNavigator';

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
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor:'white' }}>
      <Text style={{ fontSize: 24, marginBottom: 30, textAlign: 'center' }}>
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
            style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 }}
          />
          
          <TouchableOpacity
            onPress={sendOtp}
            style={{ backgroundColor: 'blue', padding: 15, borderRadius: 5 }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={{ marginBottom: 15, textAlign: 'center' }}>
            OTP sent to {phone}
          </Text>
          
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            placeholderTextColor="grey"
            keyboardType="numeric"
            style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 }}
          />
          
          <TouchableOpacity
            onPress={verifyOtp}
            placeholderTextColor="grey"
            style={{ backgroundColor: 'green', padding: 15, borderRadius: 5 }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default OtpScreen;