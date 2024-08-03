import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { STYLE_GLOBAL } from '@/constants/Style';
import CalendarPicker from 'react-native-calendar-picker';
import { Colors } from '@/constants/Colors';

export default function SelectDate({ onNextDates }:any) {

  return (
    <View>
      <Text style={STYLE_GLOBAL.headerText}>Select travel dates</Text>
      <CalendarPicker
        onDateChange={onNextDates}
        allowRangeSelection={true}
        minDate={new Date()}
        maxRangeDuration={7}
        selectedRangeStyle={{
          backgroundColor: Colors.primary,
        }}
        selectedDayTextStyle={{
          color: Colors.white,
        }}
      />
    </View>
  );
}
