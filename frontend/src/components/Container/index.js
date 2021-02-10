import React, { useState } from 'react'
import Nav from '../Nav';
import TopLoader from '../TopLoader';
import FlySidebar from '../FlySidebar';

import { Container } from './styles';
import GlobalStyle from '../../static/GlobalStyle';
import { MainContainer } from '../Main/styles';

import LoaderProvider from '../../contexts/loader';
import AuthProvider from '../../contexts/auth';

export default function ContainerWrapper({ children, navbar, ...rest }) {

    const [sidebarStatus, setSidebarStatus] = useState(false);

    return (
        <Container>
            <AuthProvider>
                <LoaderProvider>
                    <GlobalStyle />
                    <TopLoader />
                    <Nav navbarStatus={navbar} sidebarStatus={sidebarStatus} setSidebarStatus={setSidebarStatus} {...rest} />
                    <FlySidebar sidebarStatus={sidebarStatus} setSidebarStatus={setSidebarStatus} {...rest} />
                    <MainContainer>
                        {children}
                    </MainContainer>
                </LoaderProvider>
            </AuthProvider>
        </Container>
    )
}
