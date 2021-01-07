import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';

import Section from '../../components/Section';
import Thumb from '../../components/Thumb';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import {
    HomeContainer
} from './styles';

export default function HomePage() {

    useEffect(() => {
        get_newest();
    }, []);

    const get_newest = useCallback(() => {
        api.get('/', { params: { page: 1 } }).then(records => {
            setNewest(records.data.doujins);
        });
    });

    const [newest, setNewest] = useState([]);

    const Popular = () => {
        return(
            <>
                {
                    newest.length > 0
                    ? (
                        <>
                        <Thumb key={newest[0].id} id={newest[0].id} thumbnail={newest[0].cover} lang={newest[0].lang} title={newest[0].title} />
                        <Thumb key={newest[1].id} id={newest[1].id} thumbnail={newest[1].cover} lang={newest[1].lang} title={newest[1].title} />
                        <Thumb key={newest[2].id} id={newest[2].id} thumbnail={newest[2].cover} lang={newest[2].lang} title={newest[2].title} />
                        </>
                    )
                    : null
                }
            </>
        )
    }
    
    const Newest = () => {
        return(
            <>
                {
                    newest.length > 0 
                    ? newest.map(record => (
                        <Thumb key={record.id} id={record.id} thumbnail={record.cover} lang={record.lang} title={record.title} />
                    ))
                    : null
                }
            </>
        )
    }

    return(
        <HomeContainer>
            <Section SectionTitle="Popular" TitleIcon={WhatshotIcon} Content={Popular} />
            <Section SectionTitle="Newest" TitleIcon={AccessTimeIcon} Content={Newest} />
        </HomeContainer>
    )
}