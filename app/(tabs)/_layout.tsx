import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { SCREENS } from '@/constants/Screens';
import { Colors } from '@/constants/Colors';
import { TabBar } from '@/components/tabbar/TabBar';

export default function TabLayout() {


  return (
    <Tabs
      tabBar={props => <TabBar {...props}></TabBar>}
      screenOptions={({ route }) => ({
        headerShown: false
      })}>
      <Tabs.Screen name="myTrip" options={{ title: "Home" }} />
      <Tabs.Screen name={SCREENS.SAVED_TRIP} />
    </Tabs>
  )
}
