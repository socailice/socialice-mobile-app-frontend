// components/TopBar.js
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import colors from '../utils/styles/colors';

const TopBar = () => {
  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>SOCIALICE</Text>
          <View style={styles.headerIcon}>
            <Text style={styles.cubeIcon}></Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.headerRight}
          onPress={handleNotificationPress}
        >
          <View/>
          <Text style={styles.menuIcon}>⚫</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.deepIce,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 6,
    backgroundColor: colors.glacierBlue,
    borderBottomWidth: 1,
    borderBottomColor: colors.icyBlue,
    paddingRight: 10,
  },
  
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.snowWhite,
    letterSpacing: -0.3,
  },
  
  headerIcon: {
    marginLeft: 8,
  },
    
  headerRight: {
    position: 'relative',
    padding: 8,
  },
  
  
  menuIcon: {
    fontSize: 24,
    color: colors.snowWhite,
  },
});

export default TopBar;