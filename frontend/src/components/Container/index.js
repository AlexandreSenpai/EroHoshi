import React, { useState } from 'react'
import Nav from '../Nav';
import Sidebar from '../Sidebar';

import { Container } from './styles';
import GlobalStyle from '../../static/GlobalStyle';
import { MainContainer } from '../Main/styles';

export default function ContainerWrapper({ children, sidebar_default_status, ...rest }) {

    const [sidebarStatus, setSidebarStatus] = useState(sidebar_default_status);

    return (
        <Container>
            <GlobalStyle />
            <Nav sidebarStatus={sidebarStatus} setSidebarStatus={setSidebarStatus} {...rest} />
            <MainContainer>
                <Sidebar sidebarStatus={sidebarStatus} />
                {children}
            </MainContainer>
        </Container>
    )
}
