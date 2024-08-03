import { View, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'

export default function Profile() {
  const [loading, setLoading] = useState(false);

  const simulateLoading = () => {
    setLoading(true);
    // Simulate a network request or some operation
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
