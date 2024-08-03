// SavedTrips.tsx
import HotelCard from '@/components/HotelCard';
import { db } from '@/configs/FirebaseConfig';
import { FONT } from '@/constants/Font';
import { travel } from '@/constants/data';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import Timeline from 'react-native-timeline-flatlist';


const SavedTrips = () => {

  const [userTrip, setUserTrips] = useState([travel.travelPlan]);

  useEffect(() => {
    getTrips();
  }, [])

  const getTrips = async () => {
    setUserTrips([]);
    const q = query(collection(db, "users"), where('user', '==', 'niloy@gmail.com'));
    const queryShnap = await getDocs(q);
    queryShnap.forEach((doc) => {
      const tripData = doc.data().tripData.travelPlan;
      console.log(doc.id, "=>", tripData);

      if (tripData){
        setUserTrips(prev => [...prev, tripData]);
      }
    });
  }

  return (
    <ScrollView style={styles.container}>

      {userTrip?.map((travelData, index) => (
        <View key={index}>
          <Title style={styles.header}>Travel Plan</Title>

          <Card style={styles.card}>
            <Card.Title title="Flight Details" />
            <Card.Content>
              <Paragraph>Airline: {travelData.flight.details.airline}</Paragraph>
              <Paragraph>Flight Number: {travelData.flight.details.flightNumber}</Paragraph>
              <Paragraph>Departure: {`${travelData.flight.details.departureDate} at ${travelData.flight.details.departureTime}`}</Paragraph>
              <Paragraph>Arrival: {`${travelData.flight.details.arrivalDate} at ${travelData.flight.details.arrivalTime}`}</Paragraph>
              <Paragraph>Price: {travelData.flight.details.price}</Paragraph>
              <Button mode="contained" onPress={() => { }}>
                Book Now
              </Button>
            </Card.Content>
          </Card>

          <Title style={styles.header}>Hotels</Title>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {travelData.hotel.options.map((hotel, index) => (
              <HotelCard key={index} hotel={hotel} />
            ))}
          </ScrollView>

          <Title style={styles.header}>Itinerary</Title>
          {travelData.itinerary.map((day, index) => (
            <View key={index}>
              <Title style={styles.dayHeader}>{day.day}</Title>
              <Timeline
                data={day.activities.map(activity => ({
                  time: activity.bestTime.substring(0, 7),
                  title: activity.placeName,
                  description: activity.placeDetails,
                }))}
                options={{
                  style: { paddingTop: 20 }, // Adjust this padding to shift the timeline from the top
                }}
                separator={true}
                circleSize={20}
                circleColor="rgb(45,156,219)"
                lineColor="rgb(45,156,219)"
                timeContainerStyle={{ minWidth: 52 }}
                titleStyle={{
                  marginTop: -10,
                  fontFamily: FONT.MEDIUM,
                }}
                timeStyle={{
                  textAlign: 'center',
                  backgroundColor: '#ff9797',
                  color: 'white',
                  padding: 5,
                  borderRadius: 13,
                }}
                descriptionStyle={{ color: 'gray' }}
                innerCircle="dot"
              />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    marginVertical: 10,
    fontSize: 24,
  },
  card: {
    marginVertical: 10,
  },
  horizontalScroll: {
    marginVertical: 10,
  },
  dayHeader: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
  },
});

export default SavedTrips;
