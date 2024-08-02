import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';  // Adjust the import path according to your project structure
import { STYLE_GLOBAL } from '@/constants/Style';
import { FONT } from '@/constants/Font';

const ReviewTrip = () => {
  const {
    destinationAddress,
    selectedTraveler,
    selectedBudget,
    startDate,
    endDate,
  } = useSelector((state: RootState) => state.trip);

  return (
    <View style={styles.container}>
      <Text style={[STYLE_GLOBAL.headerText, { fontFamily: FONT.BOLD }]}>Review Trip</Text>
      <Text style={styles.label}>Destination:</Text>
      <Text style={styles.value}>{destinationAddress?.name}</Text>
      <Text style={styles.label}>Traveler:</Text>
      <Text style={styles.value}>{selectedTraveler}</Text>
      <Text style={styles.label}>Budget:</Text>
      <Text style={styles.value}>{selectedBudget}</Text>
      <Text style={styles.label}>Start Date:</Text>
      <Text style={styles.value}>{startDate.substring(0,10)}</Text>
      <Text style={styles.label}>End Date:</Text>
      <Text style={styles.value}>{endDate.substring(0,10)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
});

export default ReviewTrip;
