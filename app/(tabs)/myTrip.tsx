import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { STYLE_GLOBAL } from '@/constants/Style'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { FONT } from '@/constants/Font'
export default function MyTrip() {

  const onStartNewTrip = () => {

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tripView}>
        <Text style={STYLE_GLOBAL.headerText} >My Trips</Text>
        <Ionicons name="add-circle" size={30} color="black" />
      </View>
      <View style={styles.planTrip}>
        <FontAwesome6 name="map-location" size={30} color="black" />
        <Text style={styles.title}>No trips planned yet</Text>
        <Text style={styles.subtitle}>Looks like it's time to plan a new travel experience! Get started below</Text>
        <Pressable style={styles.button} onPress={onStartNewTrip}>
          <Text style={styles.buttonText}>Start a new trip</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5
  },
  planTrip:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  tripView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',

  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily:FONT.MEDIUM,
    textAlign: 'center',
  },
})