import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

const AppRouter = ():JSX.Element => (
    <Router>
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/profile/:userId/:profileId' component={Profile} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

export default AppRouter;
