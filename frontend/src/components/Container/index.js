import React, { useState } from 'react'
import Nav from '../Nav';
import TopLoader from '../TopLoader';
import FlySidebar from '../FlySidebar';

import { Container } from './styles';
import GlobalStyle from '../../static/GlobalStyle';
import { MainContainer } from '../Main/styles';

import LoaderProvider from '../../contexts/loader';

export default function ContainerWrapper({ children, ...rest }) {

    const [sidebarStatus, setSidebarStatus] = useState(false);

    return (
        <Container>
            <LoaderProvider>
                <GlobalStyle />
                <TopLoader />
                <Nav sidebarStatus={sidebarStatus} setSidebarStatus={setSidebarStatus} {...rest} />
                <FlySidebar sidebarStatus={sidebarStatus} setSidebarStatus={setSidebarStatus} {...rest} />
                <MainContainer>
                    {children}
                </MainContainer>
            </LoaderProvider>
        </Container>
    )
}
