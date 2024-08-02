import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { FONT } from '@/constants/Font'
import { STYLE_GLOBAL } from '@/constants/Style';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/configs/FirebaseConfig';

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, []);

  const [email, setEmail] = useState<string>();
  const [pass, setPass] = useState<string>();

  const OnCreateAccount = () => {
    if (email && pass)
      createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log(user)
          router.replace('/myTrip')
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          console.error(error.message);
          // ..
        });

  }

  return (
    <View style={style.container}>
      <Text style={STYLE_GLOBAL.headerText}>Create Account</Text>
      <View>
        <Text>Email</Text>
        <TextInput style={style.input}
          placeholder='email'
          onChangeText={(value) => {
            value ? setEmail(value) : "";
          }}
        />
      </View>
      <View>
        <Text>PassWord</Text>
        <TextInput style={style.input} placeholder='Password'
          onChangeText={(value) => {
            value ? setPass(value) : "";
          }}
          secureTextEntry={true}
        />
      </View>
      <Pressable onPress={ ()=> OnCreateAccount()}  style={STYLE_GLOBAL.button}>
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