import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./container/Home";
import SignIn from "./container/SignIn";
import SignUp from "./container/SignUp";
import Products from "./container/Products";
import Orders from "./container/Orders";
import PrivateRoutes from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, getInitialData } from "./actions";
import Category from "./container/Category";

function App() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (!auth.authenticate) {
            dispatch(isUserLoggedIn());
        }
        dispatch(getInitialData());
    }, []);

    return (
        <div className="App">
            <Switch>
                <PrivateRoutes path="/" exact component={Home} />
                <PrivateRoutes path="/category" exact component={Category} />
                <PrivateRoutes path="/products" component={Products} />
                <PrivateRoutes path="/orders" component={Orders} />

                <Route path="/signIn" component={SignIn} />
                <Route path="/signUp" component={SignUp} />
            </Switch>
        </div>
    );
}

export default App;
