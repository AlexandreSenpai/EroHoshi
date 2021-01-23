import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import Searchbar from '../Searchbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import logo from '../../static/images/logo.png';

import { NavContainer, UnorderedList, ListItem, Logo, MenuHolder, MenuItem } from './styles';

export default function Nav({ sidebarStatus, setSidebarStatus, history }) {
    
    const [query, setQuery] = useState(null);

    const handle_random = async () => {
        var record = await api.get('/random')
        history.push({
            pathname: `/d/${record.data.id}`,
            state: record.data
        });
    }

    useEffect(() => {
        if(query){
            handle_search();
        }
    }, [query])

    const handle_search = useCallback(async () => {
        var search = await api.get('/search', { params:  { q: query, page: 1, sort: 'recent' } })
        history.push({
            pathname: `/q/search`,
            search: `?q=${query}`,
            state: search.data
        })
    });

    return (
        <NavContainer>
            <MenuHolder>
                <MenuItem>
                    <IconButton color='inherit' size="small" onClick={() => setSidebarStatus(!sidebarStatus)}>
                        <MenuIcon fontSize='large'/>
                    </IconButton>
                </MenuItem>
                <MenuItem>
                    <Link to="/">
                        <Logo src={logo}/>
                    </Link>
                </MenuItem>
            </MenuHolder>
            <Searchbar setQuery={setQuery} />
            <UnorderedList>
                <ListItem onClick={handle_random}>Random</ListItem>
                <ListItem>Info</ListItem>
                {/* <ListItem>Upload</ListItem> */}
            </UnorderedList>
        </NavContainer>
    )
}
