import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { api, axios_object } from '../../services/api';
import Cookie from 'js-cookies';
import { uid } from 'uid';

import Section from '../../components/Section';
import Thumb from '../../components/Thumb';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import InfiniteScroller from '../../components/InfiniteScroller';

import {
    HomeContainer,
    PaginationHolder
} from './styles';

export default function HomePage() {

    const [newest, setNewest] = useState([]);
    const [popular, setPopular] = useState([]);
    const [lastId, setLastId] = useState(undefined);
    const [previousId, setPreviousId] = useState(null);
    const [cancelToken, setCancelToken] = useState(null);

    let uuid = Cookie.getItem('uid') ? Cookie.getItem('uid') : Cookie.setItem('uid', uid())

    useEffect(() => {
        get_doujins();
    }, [lastId]);

    const get_doujins = useCallback(() => {
        
        if(cancelToken){
            cancelToken.cancel("Page switch before doujin fetch.");
        }

        setCancelToken(axios_object.CancelToken.source());
        api.get('/', { params: { last_id: lastId } }).then(records => {
            if(lastId !== previousId){
                var new_doujins = records.data.doujins;
                setNewest(newest.concat(new_doujins));
            }
        });
        api.get('/popular').then(records => {
            setPopular(records.data.doujins);
        });
    });

    const Popular = () => {
        return(
            <>
                {
                    popular.length > 0
                    ? popular.map(record => (
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
            </>
        )
    }
    
    return(
        <HomeContainer>
            <Section SectionTitle="Popular" TitleIcon={WhatshotIcon} Content={Popular} />
            <Section 
                SectionTitle="Newest" 
                TitleIcon={AccessTimeIcon} 
                Content={InfiniteScroller} />
        </HomeContainer>
    )
}