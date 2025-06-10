import { ScrollView, Text,View,Image, TouchableOpacity,ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMoviesDetails } from "@/services/api";
import { icons } from "@/constants/icons";
import { addSavedMovie, deleteSavedMovie, getSavedMovies } from "@/services/appwrite";
interface MovieInfoProps {
    label:string,
    value?:string|number|null
}

const MovieInfo =({label,value}:MovieInfoProps)=>{
    return(
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-100 font-normal text-sm">{label}</Text>
        <Text className="text-light-200 font-bold text-sm mt-2">{value||'N/A'}</Text>
    </View>)
}

const MoviesDetails =()=>{
    const [save,setSave] = useState(false)
    const {id} = useLocalSearchParams();

    const { data: movie, loading } = useFetch<MovieDetails | null>(() => fetchMoviesDetails(id as string));

    const{
        data:savedmovies, 
        loading:moviesLoading,
        error:savedMoviesError
        } = useFetch(getSavedMovies)  

        useEffect(() => {
            if (savedmovies) {
                setSave(savedmovies.some((savedMovie) => savedMovie.movie_id === movie?.id));
            }
        }, [savedmovies, movie?.id]); 

        const pressAddSaveMovie = () => {

            if (movie) { 
                if (savedmovies && savedmovies.some((savedMovie) => savedMovie.movie_id === movie.id)) {
                    deleteSavedMovie(movie.id);
                } else {
                    if (!movie.id || !movie.title || !movie.poster_path) {
                        console.warn("Cannot save movie: missing data", movie);
                        return;}
                    addSavedMovie({
                        id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                      });
                }
              setSave(!save);
            } else {
              console.log("Movie is not available.");
            }
          };
          
    return(
        <View className="bg-primary flex-1">
           {(loading || moviesLoading)
            ? <ActivityIndicator
                size="large"
                color="#0000FF"
                className ="mt-[160px] self-center" 
              />
            :<ScrollView 
            style={{ backgroundColor: '#030014' }}
                contentContainerStyle={{
                    paddingBottom:80
                }}>
                <View>
                    <Image source={{uri:`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}}className="w-full h-[550px]" resizeMode="stretch"/>
                </View>
                <View className="flex-col items-start justify-center mt-5 px-5 relative">
                    <View className="flex flex-row items-center justify-between w-full">
                        <Text className="text-white font-bold text-2xl w-[70%]">
                            {movie?.title}
                        </Text>
                        <TouchableOpacity
                            className="w-[20%] mr-4 bg-dark-100 rounded-lg h-11 px-3 flex flex-row items-center justify-center z-10"
                            onPress={() => pressAddSaveMovie()}
                        >
                            <Image
                                source={icons.save}
                                className="size-6 mr-1 mt-0.5"
                                tintColor={save ? "#e9e030" : "#ffffff"}
                            />
                            <Text className="text-white font-semibold text-xs">Save</Text>
                        </TouchableOpacity>
                </View>
                    <View className="flex-row items-center gap-x-1 mt-2">
                        <Text className="text-light-200 text-sm">{movie?.release_date?.split('-')[0]}</Text>
                        <Text className="text-light-200 text-sm"> movie length {movie?.runtime} minutes</Text>
                    </View>
                    <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gaap-x-1 mt-2">
                        <Image source={icons.star} className="size-4"/>
                        <Text className="text-white font-bold text-sm">{Math.round(movie?.vote_average??0)}/10</Text>
                        <Text className="text-light-200 text-sm"> ( {movie?.vote_count} votes )</Text>
                    </View>
                        <MovieInfo label="Overview" value={movie?.overview}/>
                        <MovieInfo label="Genres" value={movie?.genres?.map((g)=>g.name).join(' - ')|| 'N/A'}/>
                    <View className="flex flex-row justify-between w-1/2 ">
                        <MovieInfo label="Budget" value={`$${(Number(movie?.budget) / 1_000_000)} million`}/>
                        <MovieInfo label="Revenue" value={`$${(Number(movie?.revenue) / 1_000_000).toFixed(1)} million`} />
                    </View>
                    <MovieInfo label="'Production Companies" value={movie?.production_companies.map(c=>c.name).join(' - ')||'N/A'}/>        
                </View>
            </ScrollView>
            }
            <TouchableOpacity className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
                              onPress={router.back}>
                <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="#ffffff"/>
                <Text className="text-white font-semibold text-base">Go back</Text>
            </TouchableOpacity>
        </View>
    )
}
export default MoviesDetails