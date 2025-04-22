import { useEffect, useState } from "react"

const useFetch = <T>(fetchFunction:()=>Promise<T>,autoFetch= true)=>{
    const[data,setData]=useState<T|null>(null);
    const[loading,setLoading]=useState(false);
    const[error,sestError]=useState<Error|null>(null);

    const fetchData = async () =>{
        try{
            setLoading(true);
            sestError(null)
            const results = await fetchFunction();
            setData(results)
        }catch(e)
            //@ts-ignore
            {sestError(e instanceof Error ? e:new Error('An error occurred'))            
        }finally{
            setLoading(false)
        }
    }
    
    const reset = () =>{
        setData(null)
        setLoading(false)
        sestError(null)
    }

    useEffect(()=>{
        if(autoFetch){
            fetchData();
        }
    },[]);

    return {data,loading,error,refetch:fetchData,reset}
}

export default useFetch