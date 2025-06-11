import { Text,TouchableOpacity,View,Dimensions } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Image } from "react-native";

interface Props {
    user:string,
    user_id:number,
    poster_url:string,
    title:string,
    movie_id:number,
    save_date:Date
}

const SavedMovieCard = ({user,user_id, poster_url, title,movie_id ,save_date}:Props)=>{
    const { width } = Dimensions.get("window");
    return(
        <Link href={`/movies/${movie_id.toString()}`} asChild>
            <TouchableOpacity className={`${width>640?"sm:w-[22.7%]":"w-[30%]"}`}>
                <Image source={{
                            uri: poster_url
                                    ?`${poster_url}`
                                    :`https://placehold.co/600x400/1a1a1a/ffffff/png`
                }}
                        className="w-full h-52 rounded-lg relative"
                        resizeMode="cover"
                />

                <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>{title}</Text>
                
                <View className="flex flex-row items-center gap-1">
                    <Text className="text-white text-xs">saved on {save_date.toString().split("T")[0]}</Text>
                </View>
                
                
            </TouchableOpacity>
        </Link>
    )
}
export default SavedMovieCard