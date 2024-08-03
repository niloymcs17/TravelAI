import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation, useRouter } from 'expo-router';
import { FONT } from '@/constants/Font';
import { STYLE_GLOBAL } from '@/constants/Style';
import { auth } from '@/configs/FirebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is already signed in:", user);
        router.replace('/myTrip'); // Redirect to myTrip page if user is already signed in
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const [email, setEmail] = useState<string>();
  const [pass, setPass] = useState<string>();

  const OnSignIn = () => {
    if (email && pass) {
      signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          // router.replace('/myTrip');
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(error.message);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={STYLE_GLOBAL.headerText}>Enter credentials to Sign In</Text>
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="email"
          value={email}
          onChangeText={(value) => setEmail(value)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Password"
          value={pass}
          onChangeText={(value) => setPass(value)}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <Pressable onPress={OnSignIn} style={STYLE_GLOBAL.button}>
        <Text style={STYLE_GLOBAL.btext}>Sign in</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/auth/sign-up')} style={STYLE_GLOBAL.button}>
        <Text style={STYLE_GLOBAL.btext}>Create Account</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    fontFamily: FONT.REGULAR,
    fontSize: 16,
  },
});
