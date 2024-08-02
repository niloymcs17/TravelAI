import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { FONT } from '@/constants/Font'
import { STYLE_GLOBAL } from '@/constants/Style';
import { auth } from '@/configs/FirebaseConfig';
import { onAuthStateChanged } from '@firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, []);

  const [email, setEmail] = useState<string>();
  const [pass, setPass] = useState<string>();

  const OnSignIn = () => {
    if (email && pass)
      signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          router.replace('/myTrip');
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(error.message);
        });

  }

  return (
    <View style={style.container}>
      <Text style={STYLE_GLOBAL.headerText}>Enter credentails to Sign In</Text>
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
      <Pressable onPress={()=> OnSignIn()} style={STYLE_GLOBAL.button}>
        <Text style={STYLE_GLOBAL.btext}>Sign in</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('auth/sign-up')} style={STYLE_GLOBAL.button}>
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