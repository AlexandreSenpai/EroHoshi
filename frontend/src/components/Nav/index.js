import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Searchbar from '../Searchbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { AuthContext } from '../../contexts/auth';

import logo from '../../static/images/logo.png';

import { 
    NavContainer,
    Logo, 
    MenuHolder, 
    MenuItem,
    UnorderedList,
    UserAvatar,
    LoginButton
} from './styles';
import { ListItem } from '@material-ui/core';
import UserOptions from '../UserOptions';

export default function Nav({ sidebarStatus, setSidebarStatus, navbarStatus, history }) {
    
    const [query, setQuery] = useState(null);
    const { currentUser } = useContext(AuthContext);
    
    useEffect(() => {
        if(query && query !== ''){
            history.push({
                pathname: `/q/search`,
                search: `?q=${query}`,
                state: {query}
            });
        }
    }, [query])

    const handle_login = () => {
        return history.push({
            pathname: "/login"
        });
    }

    return (
        <NavContainer display={navbarStatus === false ? "none" : "flex"}>
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
                <ListItem>
                    {currentUser 
                        ? <UserOptions />
                        : <LoginButton onClick={handle_login}>Login</LoginButton>}
                </ListItem>
            </UnorderedList>
        </NavContainer>
    )
}
