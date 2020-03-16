import React, {useContext} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import App from "./components/app/App";
import Meal from "./components/meal/Meal";
import Navbar from "./components/nav/Navbar"
import Login from "./components/nav/Login"
import Register from "./components/nav/Register"

// import {Wrapper} from "./components/nav/Wrapper"

import {SampleProvider} from "./contexts/sample";
import {UserProvider} from "./components/nav/UserProvider"
import {UserContext} from "./contexts/UserContext"

const Client = props => {

    const userInfo = useContext(UserContext);

    return (
        <BrowserRouter>

            <UserProvider>

                <Navbar/>


                <Switch>


                    <Route path="/search/:keyword" component={App}/>
                    <Route exact path="/" component={App}/>
                    <Route exact path="/meals/:schoolCode/:schoolName" component={Meal}/>
                    <Route exact path="/meals/:schoolCode" component={Meal}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                </Switch>
            </UserProvider>

        </BrowserRouter>
    );
};

export default Client;
