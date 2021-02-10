import React from 'react';

import { MainContainer } from './styles';

export default function Main(children){
    return(
        <MainContainer>
            {children}
        </MainContainer>
    );
}