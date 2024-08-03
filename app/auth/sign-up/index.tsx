import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation, useRouter } from 'expo-router';
import { FONT } from '@/constants/Font';
import { STYLE_GLOBAL } from '@/constants/Style';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/configs/FirebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const [email, setEmail] = useState<string>();
  const [pass, setPass] = useState<string>();

  const OnCreateAccount = () => {
    if (email && pass)
      createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log(user);
          router.replace('/myTrip');
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          console.error(error.message);
          // ..
        });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={STYLE_GLOBAL.headerText}>Create Account</Text>
      <View style={styles.inputContainer}>
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
      <Pressable onPress={OnCreateAccount} style={STYLE_GLOBAL.button}>
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
