export const TMDB_CONFIG = {
    BASE_URL:'https://api.themoviedb.org/3',
    API_KEY:process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers:{
        accept:'application/json',
        Authorization:`Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async({query}:{query:string})=>{
    const endpoint = query
    ?`${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    :`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint,{
        method:'GET',
        headers: TMDB_CONFIG.headers
        
    });
    if(!response.ok){
        //@ts-ignore
        throw new Error('Failed to fetch movies',response.statusText)
    }
    try{
    const data = await response.json();
    return data.results
    }catch(e)
        {console.log(e)}
}

export const fetchHomePageMovies = async({
  query,
  page = 1
}: {
  query: string;
  page?: number;
}) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  try {
    const data = await response.json();
    return {
      results: data.results,
      totalPages: data.total_pages,
      currentPage: page
    };
  } catch (e) {
    console.log(e);
  }
};

export const fetchMoviesDetails = async(movieId:string):Promise<MovieDetails>=>{
    try{
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,{
            method:'GET',
            headers:TMDB_CONFIG.headers,
        });
        if(!response.ok) throw new Error('Failed to fetch movie detail');
        const data = await response.json()
        return data;
    }catch(e){
        console.log(e)
        throw e;
    }
}