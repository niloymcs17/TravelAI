import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { STYLE_GLOBAL } from '@/constants/Style';
import CalendarPicker from 'react-native-calendar-picker';
import { Colors } from '@/constants/Colors';

export default function SelectDate({ onNextDates }:any) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const onDateChange = (date:any, type:any) => {
    type === 'END_DATE' ? setEndDate(date) : setStartDate(date);
  };

  const onNext = () => {
    if (startDate && endDate) {
      onNextDates(startDate, endDate);
    } else {
      console.error("Date not selected")
    }
  };

  return (
    <View>
      <Text style={STYLE_GLOBAL.headerText}>Select travel dates</Text>
      <CalendarPicker
        onDateChange={onDateChange}
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
      <Pressable onPress={onNext} style={STYLE_GLOBAL.button}>
        <Text style={STYLE_GLOBAL.btext}>Next</Text>
      </Pressable>
    </View>
  );
}
