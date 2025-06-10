import { ActivityIndicator, FlatList, StatusBar } from "react-native";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { View, Image, ScrollView, Text } from "react-native";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchHomePageMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";

export default function Index() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [movies, setMovies] = useState<any[]>([]);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError
  } = useFetch(getTrendingMovies);

  useEffect(() => {
    const fetchMoviespage = async () => {
      try {
        setMoviesLoading(true);
        const tempMovies = await fetchHomePageMovies({ query: '', page: page });
        setMaxPage(tempMovies?.totalPages || 1);

        // ป้องกันข้อมูลซ้ำ
        setMovies((temp)=>[...temp, ...(tempMovies?.results || [])]);
      } catch (e) {
        console.log(e);
      } finally {
        setMoviesLoading(false);
      }
    };

    fetchMoviespage();
  }, [page]);

  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {(moviesLoading && page === 1) || trendingMoviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000FF"
            className="mt-10 self-center"
          />
        ) : trendingMoviesError ? (
          <Text className="text-white">Error: {trendingMoviesError?.message}</Text>
        ) : (
          <View className="flex-1">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            {/* Trending Movies */}
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-10" />}
                  contentContainerStyle={{
                    paddingLeft: 24,
                    paddingRight: 24,
                    marginTop: 16,
                    marginBottom: 8
                  }}
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item, index) => `${item.searchTerm}-${index}`}
                  ListEmptyComponent={<Text className="text-white text-sm">No trending movies found</Text>}
                />
              </View>
            )}

            {/* Latest Movies */}
            <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
            <FlatList
              data={movies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 20,
                paddingRight: 5,
                marginBottom: 10
              }}
              className="mt-2"
              scrollEnabled={false}
            />

            {moviesLoading ? (
              <ActivityIndicator
                size="large"
                color="#0000FF"
                className="self-center pb-32 mt-7"
              />
            ) : maxPage > page && (
              <TouchableOpacity onPress={() => setPage(page + 1)}>
                <Text
                  className="text-white text-center font-bold pb-32 mt-7"
                  style={{
                    textDecorationLine: "underline"
                  }}
                >
                  View More
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
