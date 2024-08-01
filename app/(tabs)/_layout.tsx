import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { SCREENS } from '@/constants/Screens';

export default function TabLayout() {

    
  return (
    <Tabs screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home";
          if (route.name === SCREENS.DISCOVER) {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === SCREENS.PROFILE) {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === SCREENS.MY_TRIP) {
            iconName = focused ? "cart" : "cart-outline";
          }
  
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown:false
      })}>
        <Tabs.Screen name="myTrip" />
        <Tabs.Screen name="discover" />
        <Tabs.Screen name="profile" />
    </Tabs>
  )
}
