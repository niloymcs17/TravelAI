// HotelCard.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

interface Hotel {
  hotelName: string;
  address: string;
  price: string;
  rating: number;
  description: string;
}

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => (
  <Card style={styles.hotelCard}>
    <Card.Title title={hotel.hotelName} />
    <Card.Content>
      <Paragraph>{hotel.description}</Paragraph>
      <Paragraph>Address: {hotel.address}</Paragraph>
      <Paragraph>Price: {hotel.price}</Paragraph>
      <Paragraph>Rating: {hotel.rating}</Paragraph>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  hotelCard: {
    marginRight: 10,
    width: 300,
  },
});

export default HotelCard;
