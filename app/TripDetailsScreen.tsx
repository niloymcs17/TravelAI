// app/TripDetailsScreen.tsx
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import TripViewCard from '@/components/TripViewCard';
import Ionicons from '@expo/vector-icons/Ionicons';

const TripDetailsScreen = () => {
  const router = useRouter();
  const { selectedTrip } = useLocalSearchParams();


  if (!selectedTrip) {
    return <Text>No trip data found.</Text>;
  }

  const tripData = JSON.parse(selectedTrip);

  return (
    <ScrollView >
      <SafeAreaView style={styles.container}>
        <TripViewCard propData={tripData} />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  close: {
    alignSelf: 'flex-end',
    color: 'red',
    margin: 10,
  },
});

export default TripDetailsScreen;
