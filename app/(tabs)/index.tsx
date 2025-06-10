import { ActivityIndicator, FlatList, StatusBar } from "react-native";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { View, Image, ScrollView, Text } from "react-native";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();
  const{
    data:trendingMovies, 
    loading:trendingMoviesLoading,
    error:trendingMoviesError
    } = useFetch(getTrendingMovies)
  const{
      data:movives, 
      loading:moviesLoading,
      error:moviesError
    } = useFetch(()=>fetchMovies({query:''}))


    
  return (
    <View className="flex-1 bg-primary">
       <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
      <Image source={images.bg} className="absolute w-full z-0"/>
      <ScrollView 
          className="flex-1 px-5" 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{minHeight:"100%",paddingBottom:10}}>
              <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto "></Image> 
              
              {moviesLoading || trendingMoviesLoading?(
                <ActivityIndicator
                    size="large"
                    color="#0000FF"
                    className ="mt-10 self-center"
                />
              ):moviesError || trendingMoviesError?(
                <Text className="text-white">Error: {moviesError?.message||trendingMoviesError?.message}</Text>
              ):(
                <View className="flex-1 ">
                <SearchBar 
                    onPress={()=>router.push("/search")}
                    placeholder="Search for a movie"
                />
                <>

                  {trendingMovies && (
                    <View className="mt-10">
                      <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
                      <FlatList
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          ItemSeparatorComponent={()=><View className="w-10"/>}
                          contentContainerStyle={{ 
                                            paddingLeft: 24,
                                            paddingRight:24, 
                                            marginTop: 12, 
                                            marginBottom: 8 
                          }}
                          data={trendingMovies}
                          renderItem={({item,index})=>(
                              <TrendingCard
                                    movie={item} 
                                    index={index}/>
                          )}  
                          keyExtractor={(item)=>item.searchTerm.toString()}
                          ListEmptyComponent={<Text className="text-white text-sm">No trending movies found</Text>}
                      />
                    </View>
                 )}

                  <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
                    <FlatList 
                      data={movives}
                      renderItem={({item})=>(
                        <MovieCard {...item} />
                      )}
                        keyExtractor={(item)=>item.id.toString()}
                        numColumns={3}
                        columnWrapperStyle={{
                            justifyContent:'flex-start',
                            gap:20,
                            paddingRight:5,
                            marginBottom:10,
                        }}
                        className="mt-2 pb-32 "
                        scrollEnabled={false}
                    />
                </>
              </View>
              )}       
      </ScrollView>
    </View>
  );
}
