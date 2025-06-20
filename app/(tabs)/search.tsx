import MovieCard from "@/components/MovieCard";
import { images } from "@/constants/images";
import {ActivityIndicator, FlatList, Text,View,Dimensions } from "react-native";
import { Image } from "react-native";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";

const Search =()=>{
const[searchQuery,setSearchQuery] = useState('')
const { width } = Dimensions.get("window");
    const{
        data:movies, 
        loading:moviesLoading,
        error:moviesError,
        refetch:loadMovies,
        reset
      } = useFetch(()=>fetchMovies({query:searchQuery}),false)

      useEffect(()=>{
                const timeoutId = setTimeout(async () =>{
                    if(searchQuery.trim()){
                        await loadMovies();
                    }else{reset()}
                },1000)
                return () =>clearTimeout(timeoutId)
        },[searchQuery])
    
      useEffect(()=>{
                if(movies?.length > 0 && movies?.[0])
                    updateSearchCount(searchQuery,movies[0]);
      },[movies])

      return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} resizeMode="cover" className="flex-1 absolute w-full z-0"/>
            <FlatList
                data={movies}
                renderItem={({item})=>
                    <MovieCard {...item}/>}
                    keyExtractor={(item)=>item.id.toString()}
                    className="px-5"
                         numColumns={
                        (() => { return width > 640 ? 4 : 3;})()}        
                        columnWrapperStyle={{
                                justifyContent:'center',
                                gap:16,
                                marginVertical:16
                        }}
                    contentContainerStyle={{paddingBottom:100}}
                    ListHeaderComponent={
                        <>
                            <View className="w-full flex-row justify-center mt-20">
                                <Image source={icons.logo} className="w-12 h-10"/>
                            </View>
                            <View className="my-5">
                                <SearchBar
                                    value={searchQuery}
                                    onChangeText={(text: string)=>setSearchQuery(text)}
                                    placeholder="Search movies..."
                                />
                            </View>
                            
                            {moviesLoading && (
                                <ActivityIndicator size="large" color="#0000FF" className="my-3"/>)}
                            {moviesError && (
                                <Text className="text-red-500 px-5 my-3">Error: {moviesError.message}</Text>)}
                            {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length>0 && (
                                <Text className="text-xl text-white font-bold">Search Results for{' '}
                                    <Text className="text-accent">{searchQuery}</Text>
                                </Text>         
                            )}
                        </>
                    }
                    ListEmptyComponent={
                        !moviesLoading && !moviesError 
                        ?(
                            <View className="mt-10 px-5">
                                <Text className="text-center text-gray-500">{searchQuery.trim()?"No movies found": "search for a movie"}</Text>
                            </View>    
                         ):null
                    }
            />
        </View>
    )
}
export default Search