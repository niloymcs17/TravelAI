import LoadingOverlay from '@/components/LoadingOverlay';
import { db } from '@/configs/FirebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import PlacePhoto from '@/components/PlacePhoto';
import { useRouter } from 'expo-router';
import TripViewCard from '@/components/TripViewCard';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
const SavedTrips = () => {
  const [userTrip, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<any|null>();
  const [showTrip, setShowTrip] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTrips();
  }, []);

  const getTrips = async () => {
    setUserTrips([]);
    // const sanitizedEmail = user?.email?.replace(/[^a-zA-Z0-9]/g, '_'); // Sanitize email for Firestore document ID
    const q = query(collection(db, "niloy_gmail_com")); // use dynamic email
    const queryShnap = await getDocs(q);
    queryShnap.forEach((doc) => {
      const tripData = doc.data();
      console.log(doc.id, "=>", tripData);

      if (tripData) {
        setUserTrips(prev => [...prev, tripData]);
      }
    });
    setLoading(false);
  }

  const handlePress = (travelData: any) => {
    console.warn(travelData)
    setSelectedTrip(travelData.plan);
    setShowTrip(true);
  };

  const handleClose = () => {
    setShowTrip(false);
    setSelectedTrip(null);
  };

  return (
    <ScrollView style={styles.container}>
      <LoadingOverlay visible={loading} text="Loading data..." />
      {!showTrip && userTrip && userTrip.map((travelData, index) => (
        <TouchableOpacity key={index} style={styles.card} onPress={() => handlePress(travelData)}>
          <PlacePhoto photo={travelData?.location} />
          <Text style={styles.location}>{travelData?.destination}</Text>
        </TouchableOpacity>
      ))}

      {showTrip && selectedTrip && (
        <SafeAreaView>
          <TouchableOpacity onPress={handleClose} style={styles.close}>
          <Ionicons name="close-circle-sharp" size={35} color="black" />
          </TouchableOpacity>
          <TripViewCard propData={selectedTrip} />
        </SafeAreaView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  close:{
    alignSelf:"flex-end",
    color: "red"
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  card: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  location: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SavedTrips;
