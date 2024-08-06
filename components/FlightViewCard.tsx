import React, { } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Paragraph, Button } from 'react-native-paper';

export default function FlightViewCard({flight}:any) {
    return (
        <Card style={styles.card}>
            <Card.Title title="Flight Details" />
            <Card.Content>
                <Paragraph>Airline: {flight?.airline}</Paragraph>
                <Paragraph>Flight Number: {flight?.flightNumber}</Paragraph>
                <Paragraph>Departure: {`${flight?.departureDate} at ${flight?.departureTime}`}</Paragraph>
                <Paragraph>Arrival: {`${flight?.arrivalDate} at ${flight?.arrivalTime}`}</Paragraph>
                <Paragraph>Price: {flight?.price}</Paragraph>
                <Button mode="contained" onPress={() => { }}>
                    Book Now
                </Button>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
    },
});