import {Text,View,Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface Props {
    placeholder:string;
    onPress?:()=>void;
    value?:string;
    onChangeText?:(text: string)=>void;
}

const SearchBar =({onPress,placeholder,value,onChangeText}:Props)=>{
    return(
        <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-2">
            <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#AB8BFF"/>
            <TextInput 
                onPress={onPress}
                placeholder={placeholder}
                placeholderTextColor="#A8B5DB"
                value={value}
                onChangeText={onChangeText}
                className="flex-1 ml-2 text-white"
                />
        </View>
    )
}
export default SearchBar
