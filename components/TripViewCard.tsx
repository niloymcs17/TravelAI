import HotelCard from '@/components/HotelCard';
import PlacePhoto from '@/components/PlacePhoto';
import { Colors } from '@/constants/Colors';
import { FONT } from '@/constants/Font';
import React, { } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import Timeline from 'react-native-timeline-flatlist';
import FlightViewCard from './FlightViewCard';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function TripViewCard({ propData }: any) {
  return (
    <SafeAreaView>
      <ScrollView >
        <Title style={styles.header}>Travel Plan</Title>

        <FlightViewCard flight={propData?.flight?.details}></FlightViewCard>
        <Title style={styles.header}>Hotels</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {propData?.hotel?.options?.map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} />
          ))}
        </ScrollView>

        <Title style={styles.header}>Itinerary</Title>
        <View>
          <Timeline
            data={propData.itinerary.map((day, index) => ({
              time: day?.day?.substring(0, 5),
              title: day?.day?.substring(4),
              description: "More Details ...",
              data: day
            }))}
            options={{
              style: { paddingTop: 20, marginVertical: 10 }, // Adjust this padding to shift the timeline from the top
            }}
            onEventPress={(data) => { console.log(data) }}
            separator={true}
            circleSize={20}
            circleColor="rgb(45,156,219)"
            lineColor="rgb(45,156,219)"
            timeContainerStyle={{ width: 90 }}
            titleStyle={{
              marginTop: -10,
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
      </ScrollView>
    </SafeAreaView>
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
    fontFamily: FONT.MEDIUM
  },
});
