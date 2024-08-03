// HotelCard.tsx
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
interface Hotel {
  hotelName: string;
  address: string;
  price: string;
  rating: number;
  description: string;
  image: string;
}

interface HotelCardProps {
  hotel: Hotel;
}
const url = "https://cdn0.weddingwire.in/vendor/1739/3_2/960/jpg/welcomhotel-by-itc-hotels-raja-sansi-guest-accomodation-1_15_361739-162133553426888.jpeg";
const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => (
  <Card style={styles.hotelCard}>
    <Image source={{ uri: url }} style={styles.image} />
    <Card.Content>
      <View style={styles.header}>
        <Text style={styles.hotelName}>{hotel.hotelName}</Text>
        <Ionicons name="heart-sharp" size={24} color="red" />
      </View>
      <View style={styles.locationRow}>
        <MaterialIcons name="place" size={25} color="red" />
        <Text style={styles.address}>{hotel.address}</Text>
      </View>
      <View style={styles.ratingRow}>
        <View style={{flex:1,flexDirection:"row" , alignItems:"center"}}>
          <MaterialIcons name="star" size={25} color="#FFD700" />
          <Text style={styles.rating}>{hotel.rating}</Text>
        </View>
        <Text style={styles.price}>{hotel.price} /night</Text>
      </View>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  hotelCard: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    margin: 0,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  address: {
    marginLeft: 4,
    fontSize: 14,
    color: 'gray',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginVertical: 4,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: 'gray',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal:10
  },
  button: {
    borderRadius: 20,
  },
});

export default HotelCard;
