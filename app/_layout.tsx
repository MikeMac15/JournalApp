
import { MaterialIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Button, TouchableOpacity } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown:false
        //  title: '', headerTransparent: true,
        // headerLeft: (props) => {
        //   return (
        //     <TouchableOpacity onPress={()=> router.push('/(settings)')}>
        //       <MaterialIcons name="settings" size={24} color="black" />
        //     </TouchableOpacity>
        //   )
        //     ;
        // },
      }} />
    </Stack>
  );
}
