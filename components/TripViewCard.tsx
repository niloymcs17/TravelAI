import HotelCard from '@/components/HotelCard';
import PlacePhoto from '@/components/PlacePhoto';
import { Colors } from '@/constants/Colors';
import { FONT } from '@/constants/Font';
import React, {  } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import Timeline from 'react-native-timeline-flatlist';


export default function TripViewCard({propData}:any) {
  return (
    <ScrollView >
          <Title style={styles.header}>Travel Plan</Title>
          <Card style={styles.card}>
            <Card.Title title="Flight Details" />
            <Card.Content>
              <Paragraph>Airline: {propData.flight.details.airline}</Paragraph>
              <Paragraph>Flight Number: {propData.flight.details.flightNumber}</Paragraph>
              <Paragraph>Departure: {`${propData.flight.details.departureDate} at ${propData.flight.details.departureTime}`}</Paragraph>
              <Paragraph>Arrival: {`${propData.flight.details.arrivalDate} at ${propData.flight.details.arrivalTime}`}</Paragraph>
              <Paragraph>Price: {propData.flight.details.price}</Paragraph>
              <Button mode="contained" onPress={() => { }}>
                Book Now
              </Button>
            </Card.Content>
          </Card>

          <Title style={styles.header}>Hotels</Title>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {propData?.hotel?.options?.map((hotel, index) => (
              <HotelCard key={index} hotel={hotel} />
            ))}
          </ScrollView>

          <Title style={styles.header}>Itinerary</Title>
          {propData.itinerary.map((day, index) => (
            <View key={index}>
              <Title style={styles.dayHeader}>{day.day}</Title>
              <Timeline
                data={day.activities.map((activity:any) => ({
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
                  backgroundColor: Colors.primary,
                  color: 'white',
                  padding: 5,
                  borderRadius: 13,
                }}
                descriptionStyle={{ color: 'gray' }}
                innerCircle="dot"
              />
            </View>
          ))}
        </ScrollView>
  )
}

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
  