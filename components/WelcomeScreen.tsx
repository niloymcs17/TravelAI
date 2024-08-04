import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { FONT } from '@/constants/Font'
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
    const router = useRouter();
    return (
        <View style={style.container}>
            <Image resizeMode="cover" style={style.image} source={require('../assets/images/login.jpg')} />
            <View style={style.textContainer} >
                <Text style={style.text}>AI Travel Planner  </Text>
                <Text >Discover your perfect trip with our AI travel planner. Get personalized recommendations, seamless bookings, and expert local insights. Your dream vacation starts here.</Text>
                <Pressable onPress={()=> router.push('auth/sign-in')} >
                    <View style={style.button} >
                        <Text style={{fontSize:20, color: Colors.white, textAlign: 'center', fontFamily: FONT.MEDIUM }}>
                            Get Started
                        </Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: "100%"
    },
    text: {
        fontSize: 25,
        fontFamily: FONT.BOLD,
        textAlign: "center",
    },
    image: {
        height: 400,
        width:"100%"
        
    },
    textContainer: {
        backgroundColor: Colors.white,
        marginTop: -20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: "100%",
        width: "100%",
        padding: 15,
        flex:1,
        justifyContent:"space-between"
        
    },
    button: {
        padding: 15,
        backgroundColor: Colors.primary,
        borderRadius: 99,
        marginTop: 50
    }
});

