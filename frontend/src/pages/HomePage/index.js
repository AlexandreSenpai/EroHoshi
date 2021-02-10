import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

import Section from '../../components/Section';
import Thumb from '../../components/Thumb';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import InfiniteScroller from '../../components/InfiniteScroller';
import PlaceholderLoader from '../../components/Placeholder';

import {
    HomeContainer
} from './styles';

export default function HomePage() {

    const [popular, setPopular] = useState([]);

    useEffect(() => {
        get_popular();
    }, []);

    const get_popular = useCallback(() => {
        api.get('/popular', { params: { limit: 6 } }).then(records => {
            setPopular(records.data);
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
                    :   <>
                            <PlaceholderLoader />
                            <PlaceholderLoader />
                            <PlaceholderLoader />
                            <PlaceholderLoader />
                            <PlaceholderLoader />
                        </>
                }
            </>
        )
    }

    return(
        <HomeContainer>
            <Section SectionTitle="Trending" TitleIcon={TrendingUpIcon} Content={Popular} />
            <Section 
                SectionTitle="Newest" 
                TitleIcon={AccessTimeIcon} 
                Content={() => (<InfiniteScroller path='/'/>)} />
        </HomeContainer>
    )
}