import React, { useEffect, useRef, useState } from 'react';
import { api } from '../../services/api';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

import { SearchContainer, SearchInput } from './styles';

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
            <IconButton color='inherit' size="small" onClick={handle_search}>
                <SearchIcon fontSize="large"/>
            </IconButton>
        </SearchContainer>
    );
}

export default Searchbar;