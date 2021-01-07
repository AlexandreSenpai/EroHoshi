import React from 'react'
import Searchbar from '../Searchbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import logo from '../../static/images/logo.png';

import { NavContainer, UnorderedList, ListItem, Logo } from './styles';

export default function Nav() {
    return (
        <NavContainer className='media'>
            <UnorderedList>
                <ListItem><IconButton color='inherit' size="small"><MenuIcon fontSize='large'/></IconButton></ListItem>
                <ListItem><Logo src={logo}/></ListItem>
            </UnorderedList>
            <Searchbar />
            <UnorderedList>
                <ListItem>Random</ListItem>
                <ListItem>Info</ListItem>
                <ListItem>Upload</ListItem>
            </UnorderedList>
            {/* <SearchHolder>
                <IconButton color='inherit'>
                    <SearchIcon fontSize='large' />
                </IconButton>
            </SearchHolder> */}
        </NavContainer>
    )
}
