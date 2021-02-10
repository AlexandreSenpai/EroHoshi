import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { api, axios_object } from '../../services/api';
import InfiniteScroller from '../../components/InfiniteScroller';

import {
    DoujinContainer,
    HeaderContainer,
    TitleContent,
    TitleContainer,
    Title,
    GalleryContainer,
    AditionalContainer,
    Text
} from './styles';

export default function SearchPage({ computedMatch, location }) {

    const [query, setQuery] = useState(null);
    const [sort, setSort] = useState('recent');
    
    useEffect(() => {
        get_doujins();
    }, [location.search]);
    
    const get_doujins = useCallback(() => {
        if(location.state){
            setQuery(location.state.query);
        }else{
            let [_, query_str] =  location.search.split("=")
            setQuery(query_str.split('%20').join(' '));
        }
    }, [location.search]);

    const UpdatedScroller = useCallback(() => {
        return(
            <InfiniteScroller path='/search' aditional_body={{q: query, sort}} paginate_mode="offset" />
        );
    }, [query])

    return(
        <DoujinContainer>
            <HeaderContainer>
                <TitleContent>
                    <TitleContainer>
                        {
                            query 
                            ? <Title>Results for: {query}</Title>
                            : <Title>There's no matches for your query...</Title>
                        }
                    </TitleContainer>
                </TitleContent>
                <AditionalContainer>
                    <Text>Sort: {sort}</Text>
                </AditionalContainer>
            </HeaderContainer>
            <GalleryContainer>
                {query && query !== '' 
                ? <UpdatedScroller />
                : null}
            </GalleryContainer>
        </DoujinContainer>
    )
}