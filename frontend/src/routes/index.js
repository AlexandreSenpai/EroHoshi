import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '../components/Container';

import Home from '../pages/HomePage';
import DoujinPage from '../pages/DoujinPage';
import SearchPage from '../pages/SearchPage';
import GalleryPage from '../pages/GalleryPage';

export default function Routes(){

    const Rota = ({ path: Path, component: Component, sidebar, ...rest }) => (
        <Route Path render={props => (
            <Container sidebar_default_status={sidebar} {...props} {...rest}>
                <Component {...props} {...rest} />
            </Container>
        )} />
    )

    return(
        <Router>
            <Switch>
                <Rota path="/" exact component={Home} sidebar={true} />
                <Rota path="/d/:id" component={DoujinPage} sidebar={false} />
                <Rota path="/search" component={SearchPage} sidebar={false} />
                <Rota path="/r/:id" component={GalleryPage} sidebar={false} />
            </Switch>
        </Router>
    );
}
