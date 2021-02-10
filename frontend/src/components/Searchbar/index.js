import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../../services/api';
import SearchIcon from '@material-ui/icons/Search';
import { Form, Input } from '../Form'; 

import { SearchContainer, SearchButton } from './styles';

function Searchbar({ setQuery }) {

    const [placeholder, setPlaceholder] = useState(0);
    
    const handle_search = (evt) => {

        const { query } = evt;
        if(query && query !== ''){
            setQuery(query);
        }
    }

    useEffect(() => {
        get_total_doujins();
    }, []);

    const get_total_doujins = useCallback(() => {
        api.get('/totalDoujins').then(res => {
            setPlaceholder(res.data.total_doujins);
        })
    }, []);

    return(
        <SearchContainer>
            <Form onSubmit={handle_search}>
                <Input name="query" placeholder={`Search by ${placeholder} doujins...`} type="search" />
                <SearchButton color='inherit'>
                    <SearchIcon fontSize="large"/>
                </SearchButton>
            </Form>
        </SearchContainer>
    );
}

export default Searchbar;