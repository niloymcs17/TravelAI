import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { FONT } from '@/constants/Font'
import { STYLE_GLOBAL } from '@/constants/Style';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, []);
  return (
    <View style={style.container}>
      <Text style={STYLE_GLOBAL.headerText}>Enter credentails to Sign In</Text>
      <View>
        <Text>Email</Text>
        <TextInput style={style.input} placeholder='email' ></TextInput>
      </View>
      <View>
        <Text>PassWord</Text>
        <TextInput style={style.input} placeholder='Password' secureTextEntry={true}></TextInput>
      </View>
      <Pressable style={STYLE_GLOBAL.button}>
          <Text style={STYLE_GLOBAL.btext}>Sign in</Text>
      </Pressable>
        <Pressable onPress={ ()=>router.replace('auth/sign-up')} style={STYLE_GLOBAL.button}>
          <Text style={STYLE_GLOBAL.btext}>Create Account</Text>
      </Pressable>
      


    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  input: {
    padding: 8,
    borderWidth: 3,
    borderRadius: 10,
    fontFamily: FONT.REGULAR,
    fontSize: 25
  }
});