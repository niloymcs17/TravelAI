// LoadingOverlay.js
import React from 'react';
import { Modal, ActivityIndicator, View, StyleSheet, Text } from 'react-native';

const LoadingOverlay = ({ visible, text = 'Loading...' }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  container: {
    width: 120,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default LoadingOverlay;
