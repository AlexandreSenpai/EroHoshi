import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '../components/Container';

import Home from '../pages/HomePage';
import DoujinPage from '../pages/DoujinPage';
import SearchPage from '../pages/SearchPage';
import GalleryPage from '../pages/GalleryPage';
import MostLiked from '../pages/MostLiked';
import MostViewed from '../pages/MostViewed';
import LoginPage from '../pages/LoginPage';
import SignUpPage from "../pages/SignUpPage";
import ProfilePage from "../pages/ProfilePage";

export default function Routes(){

    const Rota = ({ path: Path, component: Component, ...rest }) => (
        <Route Path render={props => (
            <Container {...props} {...rest}>
                <Component {...props} {...rest} />
            </Container>
        )} />
    )

    return(
        <Router forceRefresh={true}>
            <Switch>
                <Rota path="/" exact component={Home} navbar={true}/>
                <Rota path="/login" component={LoginPage} navbar={false} />
                <Rota path="/signup" component={SignUpPage} navbar={false} />
                <Rota path="/p/:user_id" component={ProfilePage} navbar={true} />
                <Rota path="/d/:id" component={DoujinPage} navbar={true}/>
                <Rota path="/r/:id" component={GalleryPage} navbar={true}/>
                <Rota path="/s/highscore" component={MostLiked} navbar={true}/>
                <Rota path="/s/views" component={MostViewed} navbar={true}/>
                <Rota path="/q/search" component={SearchPage} navbar={true}/>
            </Switch>
        </Router>
    );
}
