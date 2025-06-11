import {Client, Databases,Account, ID, Query} from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const COLLECTION_SAVE_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_SAVE_ID!;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
const account = new Account(client);
const database = new Databases(client);
async function userInfo() {
    return await account.get();
}
export const updateSearchCount = async(query:string,movie:Movie)=>{
   try{
    const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
        Query.equal('searchTerm',query)
    ])
    if(result.documents.length>0){
        const existingMovie = result.documents[0];
        await database.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            existingMovie.$id,
            {count:existingMovie.count+1}
        )
    }else{
        await database.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                searchTerm:query,
                movie_id:movie.id,
                count:1,
                title:movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            }
        )}
    }catch(e){
        console.log(e);
        throw e
    }
}
export const getTrendingMovies = async():Promise<TrendingMovie[]|undefined>=>{
    try{
        const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
            Query.limit(10),
            Query.orderDesc('count'),
        ])
        return result.documents as unknown as TrendingMovie[];
    }catch(e){
        console.log(e);
        return undefined;
    }
}

export const addSavedMovie = async (movie: { id: number; title: string; poster_path: string }) => {
    const { id, title, poster_path } = movie;
    const save_date = new Date();
    const currentUser = await userInfo();
    const user = currentUser.name;
    const user_id = currentUser.$id;

    if (!id || !title || !poster_path) {
        console.warn("Movie data is incomplete:", { id, title, poster_path });
        return;
    }
    try {
        const res = await database.createDocument(
            DATABASE_ID,
            COLLECTION_SAVE_ID,
            ID.unique(),
            {
                user: user,
                user_id: user_id,
                movie_id: id,
                title: title,
                poster_url: `https://image.tmdb.org/t/p/w500${poster_path}`,
                save_date: save_date,
            }
        );
        console.log("Saved movie successfully:", res);
    } catch (e) {
        console.log("Error saving movie:", e);
        throw e;
    }
}
export const getSavedMovies = async (): Promise<SavedMovie[] | undefined> => {
    const currentUser = await userInfo();
    const userId = currentUser.$id;
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_SAVE_ID,
            [
                Query.equal('user_id', userId),
                Query.orderDesc('save_date'),
            ]
        );
        return result.documents as unknown as SavedMovie[];
    } catch (e) {
        console.log(e);
        return undefined;
    }
};
export const deleteSavedMovie = async (id: number) => {
    const currentUser = await userInfo();
    const userId = currentUser.$id;
    try {
        const savedMovies = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_SAVE_ID,
            [
                Query.equal('movie_id', id),
                Query.equal('user_id', userId),
            ]
        );

        if (savedMovies.documents.length > 0) {
            const documentId = savedMovies.documents[0].$id;
            await database.deleteDocument(
                DATABASE_ID,
                COLLECTION_SAVE_ID,
                documentId
            );
            console.log(`Deleted saved movie with movie_id: ${id} for user_id: ${userId}`);
        } else {
            console.log(`No saved movie found with movie_id: ${id} for user_id: ${userId}`);
        }
    } catch (e) {
        console.log('Failed to delete saved movie:', e);
        throw e;
    }
};

  