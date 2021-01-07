import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Container from '../components/Container';

import Home from '../pages/HomePage';

export default function Routes(){

    const Rota = ({ children, ...rest }) => {
        return(
            <Route {...rest}>
                <Container>
                    {children}
                </Container>
            </Route>
        )
    }

    return(
        <Router>
            <Switch>
                <Rota path='/' exact>
                    <Home />
                </Rota>
            </Switch>
        </Router>
    );
}