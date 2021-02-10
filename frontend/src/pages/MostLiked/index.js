import React from 'react';

import Section from '../../components/Section';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfiniteScroller from '../../components/InfiniteScroller';

import {
    HomeContainer
} from './styles';

export default function MostLiked() {

    return(
        <HomeContainer>
            <Section 
                SectionTitle="Highscore" 
                TitleIcon={FavoriteIcon} 
                Content={() => (<InfiniteScroller path="/popular" aditional_body={{ field: 'score', limit: 25 }}/>)} />
        </HomeContainer>
    )
}