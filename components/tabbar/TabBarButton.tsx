import { Colors } from '@/constants/Colors';
import { SCREENS } from '@/constants/Screens';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
const size = 25;


export default function TabBarButton({ isFocused, onPress, onLongPress, label }:any) {
    const [iconName, setIconName] = useState<"home" | "map" | "car" | "car-outline" | "map-outline">("home");


    useEffect(() => {
        //   let iconName = "home";
        if (label === SCREENS.SAVED_TRIP) {
            setIconName(isFocused ? "map" : "map-outline");
        } else if (label === SCREENS.Home) {
            setIconName(isFocused ? "car" : "car-outline");
        }
    }, [onPress]);

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabitem}
        >
            <Ionicons name={iconName} size={size} color={Colors.primary} />
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                {label}
            </Text>
        </Pressable>
    )
}

export const styles = StyleSheet.create({
    tabbar: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        marginHorizontal: "10%",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        width: "80%",
        paddingVertical: 15,
        borderRadius: 35,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1
    },
    tabitem: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    }
})