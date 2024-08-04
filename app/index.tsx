import WelcomeScreen from "@/components/WelcomeScreen";
import { View } from "react-native";


export default function Index() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
       <WelcomeScreen></WelcomeScreen>
    </View>
  );
}
