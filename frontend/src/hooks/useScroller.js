import React, { useEffect, useState, useContext } from 'react';
import { api } from '../services/api';

export default function useScroller(offset, route_path, body){
    

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [doujins, setDoujins] = useState(new Map());
    const [hasMore, setHasMore] = useState(true);
    const [notFound, setNotFound] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        setError(false);
        api.get(route_path, body).then(res => {
            if(res.data.length > 0){
                let current_doujins = Array.from(doujins);
                let new_doujins = res.data.map(douj => {return [douj.id, douj]});
    
                setDoujins(new Map([...current_doujins, ...new_doujins]));
    
                setLoading(false);
                setHasMore(true);
            }else{
                setHasMore(false);
                if(doujins.size === 0){
                    setNotFound(true);
                }
            }
        });
    }, [ offset ])

    return { loading, error, doujins, hasMore, notFound };

}