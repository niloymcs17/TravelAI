import Login from "@/components/Login";
import { auth } from "@/configs/FirebaseConfig";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";


export default function Index() {

  const  user = auth.currentUser;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {user ? <Redirect href={'/(tabs)myTrip'}></Redirect>  : <Login></Login>}
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
