import React from 'react';
import Cookie from 'js-cookies';
import { uid } from 'uid';

import Section from '../../components/Section';
import VisibilityIcon from '@material-ui/icons/Visibility';
import InfiniteScroller from '../../components/InfiniteScroller';

import {
    HomeContainer
} from './styles';

export default function MostLiked() {

    let uuid = Cookie.getItem('uid') ? Cookie.getItem('uid') : Cookie.setItem('uid', uid())

    return(
        <HomeContainer>
            <Section 
                SectionTitle="Top views" 
                TitleIcon={VisibilityIcon} 
                Content={() => (<InfiniteScroller path="/popular" aditional_body={{ limit: 25 }}/>)} />
        </HomeContainer>
    )
}