import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Searchbar from '../Searchbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import logo from '../../static/images/logo.png';

import { 
    NavContainer,
    Logo, 
    MenuHolder, 
    MenuItem} from './styles';

export default function Nav({ sidebarStatus, setSidebarStatus, history }) {
    
    const [query, setQuery] = useState(null);

    useEffect(() => {
        if(query && query !== ''){
            history.push({
                pathname: `/q/search`,
                search: `?q=${query}`,
                state: {query}
            });
        }
    }, [query])

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
        </NavContainer>
    )
}
