import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { STYLE_GLOBAL } from '@/constants/Style'
import { TravelOption } from '@/constants/TravelerType';

interface props {
  item : TravelOption,
  selectedTraveler: string
}

export default function OptionCard({ item , selectedTraveler}: props) {
  return (
    <View style={[styles.container, selectedTraveler==item.title && {borderWidth:2}]}>
      <View style={{ padding: 15 , width:"80%" }}>
        <Text style={STYLE_GLOBAL.titleText}>{item.title}</Text>
        <Text style={STYLE_GLOBAL.subtitleText}>{item.desc}</Text>
      </View>
      <Text style={{ padding:10 , fontSize: 30 }}>{item.icon}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{ 
    flex:1,
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "flex-start",
    backgroundColor:"#e4e4e4",
    borderRadius:8,
    marginVertical:10,
    marginHorizontal:10
   }

});