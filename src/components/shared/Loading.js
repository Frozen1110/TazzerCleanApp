import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export const Loading = () => (
  <View style={styles.container}>
    <View style={styles.overlay} />
    <ActivityIndicator color="#000000" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.0,
  },

  img: {
    width: 45,
    height: 45,
  },
});
