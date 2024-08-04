import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { SCREENS } from '@/constants/Screens';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {

    
  return (
    <Tabs screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home";
          if (route.name === SCREENS.SAVED_TRIP) {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === SCREENS.PROFILE) {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === SCREENS.MY_TRIP) {
            iconName = focused ? "car" : "car-outline";
          }
  
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown:false
      })}>
        <Tabs.Screen name="myTrip" />
        <Tabs.Screen name={SCREENS.SAVED_TRIP} />
    </Tabs>
  )
}
