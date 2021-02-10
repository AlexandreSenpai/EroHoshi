import React, { Fragment, useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Thumb from '../Thumb';
import useScroller from '../../hooks/useScroller';
import PlaceholderLoader from '../../components/Placeholder';

import { ScrollerContainer } from './styles';

export default function InfiniteScroller({ path, aditional_body, paginate_mode }){

    const [ offset, setOffset ] = useState(paginate_mode === 'offset' ? 0 : undefined);

    const {
        doujins,
        error,
        hasMore,
        loading,
        notFound
    } = useScroller(offset, path, { params: { last_id: offset, ...aditional_body } });

    const observer = useRef(null);

    const get_last_div = useCallback((node) => {
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                if(paginate_mode === 'offset'){
                    setOffset(prevOffset => {return prevOffset + doujins.size});
                }else{
                    setOffset(Array.from(doujins)[doujins.size - 1][1].id);
                }
            }
        });
        if(node) observer.current.observe(node);
    }, [loading, hasMore]);

    return(
        <Fragment>
            <ScrollerContainer>
                {Array.from(doujins).length > 0
                    ?   Array.from(doujins).map((doujin, index) => {
                            if(doujins.size - 1 === index){
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
                    :   notFound === false 
                        ?   <>
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
                        : <h2>Was not found any doujins about your query... :/</h2>
                }
            </ScrollerContainer>
            <Fragment>
                {hasMore === false && notFound === false
                    ? <h2>You've scrolled all the content. Congratz xD</h2>
                    : null}
            </Fragment>
        </Fragment>
    );
}