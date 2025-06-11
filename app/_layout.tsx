import { Stack } from "expo-router";
import { Platform } from "react-native";
import './globals.css';
export default function RootLayout() {
  return ( 
    <Stack
    screenOptions={{
    contentStyle: { backgroundColor: '#030014' },
  }}>
      <Stack.Screen 
              name="(tabs)"
              options={{
                headerShown:false}}
              />
      <Stack.Screen
              name="movies/[id]"
              options={{
                headerShown:false}}/>
      <Stack.Screen
       
              name="(auth)"
              options={{
                // animation: Platform.OS === 'android' ? 'none' : 'default',
                headerShown:false}}
              />
    </Stack>)
}
