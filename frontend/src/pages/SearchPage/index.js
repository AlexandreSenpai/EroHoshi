import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { api, axios_object } from '../../services/api';
import Thumb from '../../components/Thumb';
import Pagination from '../../components/Pagination';

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

    const [results, setResults] = useState([]);
    const [query, setQuery] = useState(null);
    const [oldQuery, setOldQuery] = useState(null);
    const [pages, setPages] = useState(0);
    const [sort, setSort] = useState('recent');
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [oldPage, setOldPage] = useState(1);
    const [cancelToken, setCancelToken] = useState(null);
    
    useEffect(() => {
        get_doujins();
    }, [location.search, currentPage, query]);
    
    const get_doujins = useCallback(() => {
    
        // var [_, query_str] =  location.search.split("=")

        // setOldQuery(query);
        // setQuery(query_str);

        // setCancelToken(axios_object.CancelToken.source());
        // if(location.state && currentPage === oldPage && query === oldQuery){
        //     setResults(location.state.doujins);
        //     setPages(location.state.total_pages);
        //     setTotalResults(location.state.total_results);
        //     setSort(location.state.sort);
        // }else{
        //     if(query){
        //         api.get('/search', { params: { q: query, page: currentPage, sort: 'recent' } }).then(records => {
        //             setResults(records.data.doujins);
        //             setPages(records.data.total_pages);
        //             setTotalResults(records.data.total_results);
        //             setSort(records.data.sort);
        //         });
        //     }
        // }
    });

    const handle_click = (data) => {
        setOldPage(currentPage)
        setCurrentPage(data.selected + 1);
    }

    return(
        <DoujinContainer>
            <HeaderContainer>
                <TitleContent>
                    <TitleContainer>
                            {
                                totalResults && totalResults > 0 
                                ? <Title>Results for: {query}</Title>
                                : <Title>There's no matches for your query...</Title>
                            }
                    </TitleContainer>
                </TitleContent>
                <AditionalContainer>
                    <Text>Total Results: {totalResults}</Text>
                    <Text>Sort: {sort}</Text>
                </AditionalContainer>
            </HeaderContainer>
            <GalleryContainer>
                {
                    results.length > 0
                    ? results.map(record => (
                        <Link key={record.id} to={`/d/${record.id}`}>
                            <Thumb 
                                id={record.id} 
                                thumbnail={record.cover} 
                                lang={record.lang} 
                                title={record.title} />
                        </Link>   
                      ))
                    : null
                }
            </GalleryContainer>
            <Pagination totalPages={pages} setCurrentPage={handle_click} />
        </DoujinContainer>
    )
}