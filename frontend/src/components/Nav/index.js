import React, { useState, useEffect, useContext } from 'react';
import { Link
 } from 'react-router-dom';
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
                    {/* <UserAvatar src={currentUser ? currentUser.photoURL : ''}/> */}
                    <LoginButton>Login</LoginButton>
                </ListItem>
            </UnorderedList>
        </NavContainer>
    )
}
