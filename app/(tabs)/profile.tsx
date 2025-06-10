import { View, Text, TouchableOpacity, Alert,StatusBar,Image } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import React, { useEffect, useState } from "react";
import { Account, Client } from "appwrite";
import { useRouter } from "expo-router";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);
const account = new Account(client);

const profile =()=>{
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [name,setName] = useState<string>("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setEmail(user.email);
        setName(user.name);
      } catch (error) {
        console.log("Error fetching user:", error);
        router.replace("/login");
      }
    };
    fetchUser();
  }, []);
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.replace("/login");
    } catch (error) {
      Alert.alert("Logout Failed", "Something went wrong.");
    }
  };
    return(
        
        <View className="flex-1 bg-primary">
            <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
            <Image source={images.bg} className="absolute w-full z-0"/>
            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto "></Image> 
            <Text className="text-white text-4xl font-bold mb-10 text-center mt-6">Profile</Text>
            <Text className="text-white text-3xl py-5 text-center px-2">👤 {capitalize(name)} </Text>
            <Text className="text-white text-xl text-center mb-10 my-6 px-2">
                Email: <Text className="text-white text-xl font-medium">{email}</Text>
            </Text>

      <TouchableOpacity
        onPress={()=>router.replace("/saved")}
        className="bg-gray-700 px-8 mt-6 py-6 rounded-2xl mx-10 shadow-md shadow-gray-300 active:opacity-80 flex flex-row justify-center items-center gap-2">
        <Image source={icons.save} tintColor="#e9e030"/>
        <Text className="text-white text-xl font-semibold text-center"> Go to my saved</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=>router.replace("/search")}
        className="bg-gray-700 px-8 mt-6 py-6 rounded-2xl mx-10 shadow-md shadow-gray-300 active:opacity-80 flex flex-row justify-center items-center gap-2">
        <Image source={icons.search} tintColor="#ffffff"/>
        <Text className="text-white text-xl font-semibold text-center"> Go to Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-gray-700 px-8 mt-6 py-6 rounded-2xl mx-10 shadow-md shadow-gray-300 active:opacity-80 flex flex-row justify-center items-center gap-3">
        <Text>🔌 </Text>
        <Text className="text-white text-xl font-semibold text-center">Logout</Text>
      </TouchableOpacity>
        </View>
    )
}
export default profile