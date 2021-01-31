import React, { useContext } from 'react';
import LoadingBar from 'react-top-loader';
import { LoaderContext } from '../../contexts/loader';

import {
    TopLoaderContainer
} from './styles';

export default function TopLoader(){

    const { isLoading } = useContext(LoaderContext);

    return(
        <TopLoaderContainer>
            <LoadingBar color="#ff6a00" show={isLoading} />
        </TopLoaderContainer>
    );
}