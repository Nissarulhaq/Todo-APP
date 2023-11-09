// SplashScreen.js

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./images/todoimage.png')}
        style={styles.splashImage}
      />
      <Text style={styles.splashText}>Cogveel Todo App</Text>
      <Text style={styles.subtext}>Developed by Nissar-ul-haq</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray', // Set your background color
  },
  splashImage: {
    width: 250,
    height: 250, // Adjust the size according to your splash image
    borderRadius:125,
  },
  splashText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtext:{
    textAlign:'center',
    fontSize: 18,
    fontWeight: '500',
  }
});

export default SplashScreen;
