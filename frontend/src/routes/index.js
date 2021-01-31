import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '../components/Container';

import Home from '../pages/HomePage';
import DoujinPage from '../pages/DoujinPage';
import SearchPage from '../pages/SearchPage';
import GalleryPage from '../pages/GalleryPage';
import MostLiked from '../pages/MostLiked';
import MostViewed from '../pages/MostViewed';

export default function Routes(){

    const Rota = ({ path: Path, component: Component, sidebar, ...rest }) => (
        <Route Path render={props => (
            <Container {...props} {...rest}>
                <Component {...props} {...rest} />
            </Container>
        )} />
    )

    return(
        <Router forceRefresh={true}>
            <Switch>
                <Rota path="/" exact component={Home} />
                <Rota path="/d/:id" component={DoujinPage} />
                <Rota path="/r/:id" component={GalleryPage}/>
                <Rota path="/s/highscore" component={MostLiked} />
                <Rota path="/s/views" component={MostViewed} />
                <Rota path="/q/search" component={SearchPage} />
            </Switch>
        </Router>
    );
}
