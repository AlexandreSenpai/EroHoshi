import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Thumb from '../Thumb';
import useScroller from '../../hooks/useScroller';
import PlaceholderLoader from '../../components/Placeholder';

import { ScrollerContainer } from './styles';

export default function InfiniteScroller({ path, aditional_body }){

    const [ lastId, setLastId ] = useState(undefined);

    const {
        doujins,
        error,
        hasMore,
        loading
    } = useScroller(lastId, path, { params: { last_id: lastId, ...aditional_body } });

    const observer = useRef(null);

    const get_last_div = useCallback((node) => {
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setLastId(Array.from(doujins)[doujins.size - 1][1].id)
            }
        });
        if(node) observer.current.observe(node);
    }, [loading, hasMore]);

    return(
        <ScrollerContainer>
            {Array.from(doujins).length > 0
                ?   Array.from(doujins).map((doujin, index) => {
                        if(doujins.size - 1 === index){
                            console.log(doujin)
                            return (<Link ref={get_last_div} key={doujin[1].id} to={`/d/${doujin[1].id}`}>
                                        <Thumb 
                                            id={doujin[1].id} 
                                            thumbnail={doujin[1].cover} 
                                            lang={doujin[1].lang} 
                                            title={doujin[1].title} />
                                    </Link>)
                        }else{
                            return (<Link key={doujin[1].id} to={`/d/${doujin[1].id}`}>
                                    <Thumb 
                                        id={doujin[1].id} 
                                        thumbnail={doujin[1].cover} 
                                        lang={doujin[1].lang} 
                                        title={doujin[1].title} />
                                </Link>)
                        }})
                :   <>
                        <PlaceholderLoader />
                        <PlaceholderLoader />
                        <PlaceholderLoader />
                        <PlaceholderLoader />
                        <PlaceholderLoader />
                        <PlaceholderLoader />
                        <PlaceholderLoader />
                        <PlaceholderLoader />
                        <PlaceholderLoader />
                        <PlaceholderLoader />
                        <PlaceholderLoader />
                        <PlaceholderLoader />
                    </>
            }
        </ScrollerContainer>
    );
}