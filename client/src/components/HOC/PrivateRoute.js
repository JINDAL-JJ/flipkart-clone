import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoutes = ({component: Component, ...rest}) => {
    // const auth = useSelector(state=>state.auth);
    return <Route {...rest} component={(props) => {
        const token = window.localStorage.getItem('token');
        if (token) {
            return <Component {...props} />
        } else {
            return <Redirect to={`/signIn`} />
        }
    }}/>
}

export default PrivateRoutes;