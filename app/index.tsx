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
      {user || true ? <Redirect href={'/myTrip'}></Redirect>  : <Login></Login>}
    </View>
  );
}
