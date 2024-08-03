import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { STYLE_GLOBAL } from '@/constants/Style';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SelectBudgetList, SelectTravelerList } from '@/constants/TravelerType';
import OptionCard from '@/components/OptionCard';
import { FONT } from '@/constants/Font';
import SelectDate from '@/components/SelectDate';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setDestinationAddress, setSelectedTraveler, setSelectedBudget, setStartDate, setEndDate } from '@/store/tripSlice';

export default function SearchPlace() {
    const navigation = useNavigation();
    const router = useRouter();
    const dispatch = useDispatch();
    const [destinationAddress, setDestinationAddressState] = useState<any>();
    const [selectedTraveler, setSelectedTravelerState] = useState<any>();
    const [selectedBudget, setSelectedBudgetState] = useState<any>();
    const [formState, setFormState] = useState<any>(1); // Start with the initial state
    const [startDate, setStartDateState] = useState<Date | null>(null);
    const [endDate, setEndDateState] = useState<Date | null>(null);

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerTitle: "Search"
        });
    }, []);

    const handleNext = () => {
        if (formState === 1 && !destinationAddress) {
            alert('Please select a destination.');
            return;
        } else if (formState === 2 && !selectedTraveler) {
            alert('Please select a traveler.');
            return;
        } else if (formState === 3 && !(startDate && endDate)) {
            alert('Please select Dates.');
            return;
        } else if (formState === 4) {
            if (!selectedBudget) {
                alert('Please select a Budget.');
                return;
            }
            dispatch(setDestinationAddress(destinationAddress));
            dispatch(setSelectedTraveler(selectedTraveler));
            dispatch(setSelectedBudget(selectedBudget));
            dispatch(setStartDate(startDate?.toISOString() || ''));
            dispatch(setEndDate(endDate?.toISOString() || ''));
            router.push("/create-trip/review-trip");
            return;
        }
        setFormState(formState + 1);
    };

    const handlePrevious = () => {
        if (formState > 1) {
            setFormState(formState - 1);
        }
    };

    const onNextDates = (date: Date, type: string) => {
        if (type === 'END_DATE') {
            setEndDateState(date);
        } else {
            setStartDateState(date);
        }
    };

    return (
        <View style={styles.container}>
            {formState === 1 && (
                <View style={{ flex: 1 }}>
                    <Text style={[STYLE_GLOBAL.headerText, { fontFamily: FONT.BOLD }]}>Where are you travelling to?</Text>
                    <GooglePlacesAutocomplete
                        styles={{
                            textInputContainer: {
                                borderWidth: 2,
                                borderRadius: 5,
                                margin: 5
                            },
                        }}
                        placeholder='Search'
                        onPress={(data, details = null) => {
                            setDestinationAddressState({
                                name: data.description,
                                coordinates: details?.geometry?.location,
                                url: details?.url,
                            });
                        }}
                        query={{
                            key: "AIzaSyAJQsu6pd9FQovj0Hgd7JCp19WL0mq0BUY",
                            language: 'en',
                        }}
                    />
                </View>
            )}
            {formState === 2 && (
                <View style={{ flex: 1 }}>
                    <Text style={[STYLE_GLOBAL.headerText]}>Who is traveling</Text>
                    <FlatList
                        data={SelectTravelerList}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => setSelectedTravelerState(item.title)}>
                                <OptionCard item={item} selectedItem={selectedTraveler} />
                            </Pressable>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            )}
            {formState === 3 && (
                <SelectDate onNextDates={onNextDates} />
            )}
            {formState === 4 && (
                <View style={{ flex: 1 }}>
                    <Text style={[STYLE_GLOBAL.headerText, { fontFamily: FONT.BOLD }]}>Budget</Text>
                    <FlatList
                        data={SelectBudgetList}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => setSelectedBudgetState(item.title)}>
                                <OptionCard item={item} selectedItem={selectedBudget} />
                            </Pressable>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            )}
            <View style={styles.navigationButtons}>
                {formState > 1 && (
                    <Pressable style={styles.button} onPress={handlePrevious}>
                        <Text style={styles.buttonText}>Back</Text>
                    </Pressable>
                )}
                {formState < 4 && (
                    <Pressable style={styles.button} onPress={handleNext}>
                        <Text style={styles.buttonText}>Next</Text>
                    </Pressable>
                )}
                {formState == 4 && (
                    <Pressable style={styles.button} onPress={handleNext}>
                        <Text style={styles.buttonText}>Preview Trip</Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        padding: 10,
        backgroundColor: "white",
        alignContent: "flex-start",
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
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
        fontFamily: FONT.MEDIUM,
        textAlign: 'center',
    },
});
