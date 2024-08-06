import store from "@/store/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/PlaywriteDKLoopet-Regular.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  })
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index"
          options={{
            headerShown: false
          }} />
        <Stack.Screen name="(tabs)"
          options={{
            headerShown: false
          }} />
      </Stack>
    </Provider>
  );
}
