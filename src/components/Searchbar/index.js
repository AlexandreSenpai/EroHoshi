import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

import { SearchContainer, SearchInput } from './styles';

function Searchbar() {
    return(
        <SearchContainer>
            <SearchInput placeholder="Search..." type="search"/>
            <IconButton color='inherit' size="small">
                <SearchIcon fontSize="large"/>
            </IconButton>
        </SearchContainer>
    );
}

export default Searchbar;