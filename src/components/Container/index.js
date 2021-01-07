import React from 'react'
import Nav from '../Nav';
import Sidebar from '../Sidebar';

import { Container } from './styles';
import GlobalStyle from '../../static/GlobalStyle';
import { MainContainer } from '../Main/styles';

export default function index({ children }) {
    return (
        <Container>
            <GlobalStyle />
            <Nav />
            <MainContainer>
                <Sidebar />
                {children}
            </MainContainer>
        </Container>
    )
}
