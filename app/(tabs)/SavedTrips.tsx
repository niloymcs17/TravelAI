import LoadingOverlay from '@/components/LoadingOverlay';
import { db } from '@/configs/FirebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter
import PlacePhoto from '@/components/PlacePhoto';
import { SafeAreaView } from 'react-native-safe-area-context';

const SavedTrips = () => {
  const [userTrip, setUserTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getTrips();
  }, []);

  const getTrips = async () => {
    setUserTrips([]);
    const q = query(collection(db, "niloy_gmail_com")); // use dynamic email
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const tripData = doc.data();

      if (tripData) {
        setUserTrips((prev) => [...prev, tripData]);
      }
    });
    setLoading(false);
  }

  const handlePress = (travelData: any) => {
    router.push({ pathname: '/TripDetailsScreen', params: { selectedTrip: JSON.stringify(travelData.plan) } });
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={{ paddingBottom: 100 }}>
        <LoadingOverlay visible={loading} text="Loading data..." />
        {userTrip.map((travelData, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => handlePress(travelData)}>
            <PlacePhoto photo={travelData?.location} />
            <Text style={styles.location}>{travelData?.destination}</Text>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal:10
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
