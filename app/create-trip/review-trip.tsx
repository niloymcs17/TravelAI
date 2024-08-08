import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';  // Adjust the import path according to your project structure
import { STYLE_GLOBAL } from '@/constants/Style';
import { FONT } from '@/constants/Font';
import Icon from 'react-native-vector-icons/MaterialIcons';  // Ensure you have vector icons installed
import { useNavigation, useRouter } from 'expo-router';
import { chatSession } from '@/configs/AiModal';
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from '@/configs/FirebaseConfig';
import LoadingOverlay from '@/components/LoadingOverlay';
import { AI_PROMPT } from '@/constants/AiPrompt.const';

const ReviewTrip = () => {
  const {
    destinationAddress,
    selectedTraveler,
    selectedBudget,
    startDate,
    endDate,
  } = useSelector((state: RootState) => state.trip);
  const navigation = useNavigation();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: false,
      headerTitle: "Review Trip"
    });
  }, []);


  const user = auth.currentUser;
  const onStartNewTrip = async () => {
    setLoading(true);
    if(true){
      const FINAL_PROMPT = AI_PROMPT
        .replace('{destination}', destinationAddress?.name)
        .replace('{source}', "kolkata")
        .replace('{startDate}', startDate)
        .replace('{endDate}', endDate)
        .replace('{travelWith}', selectedTraveler)
        .replace('{numberOfPerson}', "4")
        .replace('{budget}', selectedBudget)

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result.response.text());
      const sanitizedEmail = user?.uid?.replace(/[^a-zA-Z0-9]/g, '_'); // Sanitize email for Firestore document ID
      const tdata = JSON.parse(result.response.text());
      if (sanitizedEmail && tdata) {
        const docId = Date.now().toString();
        try {
          const docRef = doc(db, sanitizedEmail, docId);
          await setDoc(docRef, {
            plan: tdata.travelPlan,
            destination: destinationAddress?.name,
            travelerType: selectedTraveler,
            location: destinationAddress?.placeID
          });
          console.log("Document written....");
          setLoading(false);
          router.replace("/SavedTrips")
        } catch (e) {
          console.error("Error adding document: ", e);
          setLoading(false);

        }
      }
    } else {
      alert(" You are not logged in!!! ");
    }
    setLoading(false);

  };

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={loading} text="Loading data..." />

      <Text style={[STYLE_GLOBAL.headerText, styles.headerText]}>Review your trip</Text>
      <Text style={styles.subHeader}>Before generating your trip, please review your selection</Text>

      <View style={styles.row}>
        <Icon name="location-pin" size={24} color="red" />
        <View style={styles.column}>
          <Text style={styles.label}>Destination</Text>
          <Text style={styles.value}>{destinationAddress?.name}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Icon name="calendar-today" size={24} color="blue" />
        <View style={styles.column}>
          <Text style={styles.label}>Travel Date</Text>
          <Text style={styles.value}>{`${startDate} To ${endDate}`}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Icon name="person" size={24} color="green" />
        <View style={styles.column}>
          <Text style={styles.label}>Who is Traveling</Text>
          <Text style={styles.value}>{selectedTraveler}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Icon name="attach-money" size={24} color="gold" />
        <View style={styles.column}>
          <Text style={styles.label}>Budget</Text>
          <Text style={styles.value}>{selectedBudget}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={onStartNewTrip} style={styles.button}>
        <Text style={styles.buttonText}>Build My Trip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  headerText: {
    fontFamily: FONT.BOLD,
    fontSize: 24,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  column: {
    marginLeft: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  button: {
    marginTop: 30,
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReviewTrip;
