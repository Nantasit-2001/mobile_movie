import { Stack } from "expo-router";
import './globals.css';
// import { UserProvider } from "@/context/auth";
export default function RootLayout() {
  return ( 
    <Stack
    screenOptions={{
    contentStyle: { backgroundColor: '#030014' },
  }}>
      <Stack.Screen 
              name="(tabs)"
              options={{headerShown:false}}
              />
      <Stack.Screen
              name="movies/[id]"
              options={{headerShown:false}}/>
      <Stack.Screen 
              name="(auth)"
              options={{headerShown:false}}
              />
    </Stack>)
}
