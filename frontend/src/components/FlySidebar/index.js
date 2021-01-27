import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import Clear from '@material-ui/icons/Clear';
import InfoIcon from '@material-ui/icons/Info';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

import { SidebarContainer, UnorderedList, ListItem, Separator, MenuHolder } from './styles';
import { Link } from 'react-router-dom';

export default function FlySidebar({ sidebarStatus, setSidebarStatus }){
    return(
        <SidebarContainer sidebarStatus={sidebarStatus === true ? 'block' : 'none'}>
            <MenuHolder>
                <IconButton size="small" color="inherit" onClick={() => setSidebarStatus(!sidebarStatus)}>
                    <Clear color="inherit" fontSize="large" />
                </IconButton>
            </MenuHolder>
            <UnorderedList>
                <ListItem><AllInclusiveIcon fontSize='large' color='inherit'/> Random</ListItem>
                <ListItem><InfoIcon fontSize='large' color='inherit'/> Information</ListItem>
            </UnorderedList>
            <Separator />
            {/* <UnorderedList>
                <ListItem><LocalOfferIcon fontSize='large' color='inherit'/> Tags</ListItem>
                <ListItem><EmojiEmotionsIcon fontSize='large' color='inherit'/> Parodys</ListItem>
                <ListItem><PersonIcon fontSize='large' color='inherit'/> Character</ListItem>
                <ListItem><BubbleChartIcon fontSize='large' color='inherit'/> Artists</ListItem>
                <ListItem><PeopleAltIcon fontSize='large' color='inherit'/> Group</ListItem>
            </UnorderedList>
            <Separator /> */}
            <UnorderedList>
                <Link to="/s/views"><ListItem><VisibilityIcon fontSize='large' color='inherit'/> Most Viewed</ListItem></Link>
                <Link to="/s/highscore"><ListItem><FavoriteIcon fontSize='large' color='inherit'/> Most Liked</ListItem></Link>
                <ListItem><FindInPageIcon fontSize='large' color='inherit'/> Most Searched</ListItem>
            </UnorderedList>
        </SidebarContainer>
    );
}