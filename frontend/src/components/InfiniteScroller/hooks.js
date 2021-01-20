import React, { useEffect, useState } from 'react';
import { api, axios_object } from '../../services/api';

export default function useScroller(last_id){
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [doujins, setDoujins] = useState(new Map());
    const [hasMore, setHasMore] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        setError(false);
        api.get('/', { params: { last_id } }).then(res => {
            
            var current_doujins = Array.from(doujins)
            var new_doujins = res.data.doujins.map(douj => {return [douj.id, douj]})

            setDoujins(new Map([...current_doujins, ...new_doujins]))

            setLoading(false);
        })
    }, [ last_id ])

    return { loading, error, doujins, hasMore };

}