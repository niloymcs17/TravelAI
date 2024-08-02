import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { STYLE_GLOBAL } from '@/constants/Style';
import { useNavigation } from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FlatList } from 'react-native-gesture-handler';
import { SelectTravelerList } from '@/constants/TravelerType';
import OptionCard from '@/components/OptionCard';
import { FONT } from '@/constants/Font';
import SelectDate from '@/components/select-date';

export default function SearchPlace() {
    const navigation = useNavigation();
    const [destinationAddress, setDestinationAddress] = useState<any>();
    const [selectedTraveler, setSelectedTraveler] = useState<any>();
    const [formState, setFormState] = useState<any>(3);

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerTitle: "Search"
        });
    }, []);

    useEffect(() => {
        if (destinationAddress) {
            setFormState(2);
            console.log(destinationAddress);
        }
    }, [destinationAddress]);

    useEffect(() => {
        if (selectedTraveler) {
            setFormState(3);
            console.log(selectedTraveler);
        }
    }, [selectedTraveler]);

    return (
        <ScrollView style={styles.container}>

            {formState === 1 && (
                <>
                    <Text style={[STYLE_GLOBAL.titleText, { fontFamily: FONT.MEDIUM }]}>Where are you travelling to?</Text>
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
                            // 'details' is provided when fetchDetails = true
                            console.log(details);
                            setDestinationAddress({
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
                </>
            )}
            {formState === 2 && (<View style={{ flex: 1 }}>
                <Text style={[STYLE_GLOBAL.headerText]}>Who is traveling</Text>
                <FlatList
                    data={SelectTravelerList}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => setSelectedTraveler(item.title)}>
                            <OptionCard item={item} selectedTraveler={selectedTraveler} />
                        </Pressable>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </View>)}

            <SelectDate />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mapSearch: {
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 8,
    },
    container: {
        flex: 1,
        width: "100%",
        padding: 10,
        backgroundColor: "white",
        alignContent: "flex-start",
    },
});
