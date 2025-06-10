import { Text,View,Image, StatusBar, ScrollView, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import useFetch from "@/services/useFetch";
import { getSavedMovies } from "@/services/appwrite";
import SavedMovieCard from "@/components/SavedMovieCcard";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
const saved =()=>{
    const{
        data:savedmovies, 
        loading:moviesLoading,
        error:savedMoviesError,
        refetch
        } = useFetch(getSavedMovies)    
        useFocusEffect(
            useCallback(() => {
              refetch();
            }, [])
          );
        

    return(
        <View className="bg-primary flex-1">
            <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
            <Image source={images.bg} className="absolute w-full z-0"/>
            <ScrollView className="flex-1 px-5"  showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight:"100%",paddingBottom:10}}>
                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto "></Image> 
            {moviesLoading? (
                            <ActivityIndicator
                                size="large"
                                color="#0000FF"
                                className ="mt-10 self-center"
                            />)
            :savedMoviesError?(
                            <Text className="text-white">Error: 
                                {savedMoviesError?.message}
                            </Text>)
            :(<View>
                <Text className="text-lg text-white font-bold mb-5 mt-8">Saved movies</Text>
                {savedmovies?.length===0  && <Text className="text-gray-400 text-center mt-10">No movies has been saved yet.</Text>}
                <FlatList 
                      data={savedmovies}
                      renderItem={({item})=>(
                        <SavedMovieCard {...item}/>
                      )}
                        keyExtractor={(item)=>item.movie_id.toString()}
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
            </View>)
            }            
            </ScrollView>
        </View>
    )
}
export default saved