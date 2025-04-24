import { Link } from "expo-router";
import { Text,TouchableOpacity,View,Image } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view"
import { images } from "@/constants/images";
const TrendingCard =({movie:{movie_id,title,poster_url},index}:TrendingCardProps)=>{
    return(
        <Link href={`/movies/${movie_id}`} asChild>
            
            <TouchableOpacity className="w-32 relative ">
                <Image 
                    source={{uri:poster_url}}
                    className="w-32 h-48 rounded-lg"
                    resizeMode = "cover"
                />
                <View className="absolute bottom-6 left-[-24px] px-2 py-1 w-full">
                    <MaskedView maskElement={ 
                        <View>
                            <Text className="font-bold text-white text-6xl">{index + 1}</Text>
                        </View>
                        }>
                        <Image 
                            source={images.rankingGradient}
                            className="size-14 w-full"
                            resizeMode="cover"
                        />
                    </MaskedView>
                </View>
                <Text className="text-sm font-bold pt-4 text-light-200" numberOfLines={1}>{title}</Text>
            
            </TouchableOpacity>
        </Link>
    )
}
export default TrendingCard
