import React, { useState } from 'react'
import Nav from '../Nav';
import FlySidebar from '../FlySidebar';

import { Container } from './styles';
import GlobalStyle from '../../static/GlobalStyle';
import { MainContainer } from '../Main/styles';

export default function ContainerWrapper({ children, ...rest }) {

    const [sidebarStatus, setSidebarStatus] = useState(false);

    return (
        <Container>
            <GlobalStyle />
            <Nav sidebarStatus={sidebarStatus} setSidebarStatus={setSidebarStatus} {...rest} />
            <MainContainer>
                <FlySidebar sidebarStatus={sidebarStatus} setSidebarStatus={setSidebarStatus}/>
                {children}
            </MainContainer>
        </Container>
    )
}
