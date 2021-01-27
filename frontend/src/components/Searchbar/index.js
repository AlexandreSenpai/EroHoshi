import React, { useEffect, useRef, useState } from 'react';
import { api } from '../../services/api';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

import { SearchContainer, SearchInput, SearchButton, Form } from './styles';

function Searchbar({ setQuery }) {

    const [placeholder, setPlaceholder] = useState(0);

    const search_ref = useRef(null);
    
    const handle_search = () => {
        setQuery(search_ref.current.value);
    }

    useEffect(() => {
        api.get('/totalDoujins').then(res => {
            setPlaceholder(res.data.total_doujins);
        })
    }, [])

    return(
        <SearchContainer>
            <SearchInput placeholder={`Search by ${placeholder} doujins...`} type="search" ref={search_ref}/>
            <SearchButton color='inherit' onClick={handle_search}>
                <SearchIcon fontSize="large"/>
            </SearchButton>
        </SearchContainer>
    );
}

export default Searchbar;