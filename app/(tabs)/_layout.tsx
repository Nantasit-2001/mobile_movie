import { Tabs } from "expo-router";
import React from "react";
import { ImageBackground, Image, Text, View  } from "react-native";
import {images} from '../../constants/images'
import { icons } from "@/constants/icons";

const TabIcon = ({focused=false, icon={}, title=''}) =>{
    if(focused){
    return(
        <>
            <ImageBackground source={images.highlight} 
                className="flex flex-row w-full min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden ">
                    <Image source={icon} tintColor="#151312" className="sise-5"/>
                    <Text className=" text-secondary text-base font-semibold ml-2">{title}</Text>
            </ImageBackground>
        </>
        )}
        else{
            return(
                <View className="size-full justify-center items-center mt-4 rounded-full ">
                    <Image source={icon} tintColor="#A8B5DB" className="size-5"/>    
                </View>
                )
            }
}

const _Layout =()=>{
    return (
        <Tabs
            screenOptions={{tabBarShowLabel:false,
            tabBarItemStyle:{
                width:'100%',
                height:'100%',
                justifyContent: 'center',
                alignItems: 'center',   
            },
            tabBarStyle:{
                backgroundColor:'#0F0D23',
                borderTopWidth: 0,
                borderRadius:50,
                paddingHorizontal: 12,
                marginHorizontal:20,
                marginBottom:36,
                height:52,
                position:'absolute',
                overflow:'hidden',
                }  
            }}
        >
          <Tabs.Screen
            name="index"  // home
            options={{
              title: 'Home',
              headerShown: false,
              tabBarIcon:({focused}) =>(
                <TabIcon 
                    focused={focused}
                    icon = {icons.home}
                    title = "Home"
                />
              )
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: 'Search',
              headerShown: false,              
              tabBarIcon:({focused}) =>(
              <TabIcon 
                focused={focused}
                icon = {icons.search}
                title = "Search"
              />
              )
            }}
          />
          <Tabs.Screen
            name="saved"
            options={{
              title: 'Saved',
              headerShown: false,
              tabBarIcon:({focused}) =>(
              <TabIcon 
                focused={focused}
                icon = {icons.save}
                title = "Saved"
              />
              )
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              headerShown: false,
              tabBarIcon:({focused}) =>(
                <TabIcon 
                    focused={focused}
                    icon = {icons.person}
                    title = "Profile"
                />
              )
            }}
          />
        </Tabs>
      );      
}
export default _Layout