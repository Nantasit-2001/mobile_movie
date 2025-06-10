import { Text,TouchableOpacity,View,Dimensions } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Image } from "react-native";
import { icons } from "@/constants/icons";

type Props = {
    vote_average: number;
}
const StarRating = ( {vote_average}:Props ) => {
    const rating = Math.round(vote_average / 2);
    return (
      <View className="flex-col">
        {Array.from({ length: rating }).map((_, i) => (
          <Image 
            className="w-4 h-4"
            key={i}
            source={i < rating ? icons.star :null}
            resizeMode="contain"
          />
        ))}
      </View>
    );
  };

const MovieCard = ({id, poster_path, title, vote_average, release_date}: Movie) => {
  const { width } = Dimensions.get("window");
  return (
    <Link href={`/movies/${id.toString()}`} asChild>
      <TouchableOpacity className={`${width>640?"sm:w-[22.7%]":"w-[30%]"}`}>
        <Image source={{
              uri: poster_path
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : `https://placehold.co/600x400/1a1a1a/ffffff/png`
        }}
            className="w-full h-52 rounded-lg relative"
            resizeMode="cover"
        />
        <View className="absolute top-1 right-1">
          <StarRating vote_average={Number(vote_average)} />
        </View>
        
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>{title}</Text>
        
        <View className="flex flex-row items-center gap-1">
          <Image source={icons.star} className="size-4"/>
          <Text className="text-white text-sm">{(vote_average / 2).toFixed(2)}</Text>
        </View>
        
        <Text className="text-xs text-light-300">{release_date?.split('-')[0]}</Text>
        
      </TouchableOpacity>
    </Link>
  )
}
export default MovieCard