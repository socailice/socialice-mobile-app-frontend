import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CubeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>cube</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CubeScreen;
