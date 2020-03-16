import React, {useEffect, useState, useContext} from "react";


import styled from 'styled-components';

import {withRouter, Link} from "react-router-dom";

import {getCookie, removeCookie} from "../../lib/cookie"
import {parseJwt} from "../../lib/jwt";
import {GetMyIdentity} from "../../api/Auth"

import {SampleConsumer} from "../../contexts/sample";

import {UserContext} from "../../contexts/UserContext"

const Navbar = props => {

    const userInfo = useContext(UserContext);
    const { setState } = useContext(UserContext);




    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState({"id": undefined, "nickname": ""});
    useEffect(() => {


        async function getIsLogin() {
            let response = await GetMyIdentity()
            console.log("!!", userData)

            switch (response.status) {
                case 200:
                    console.log(response.data.data)
                    let data = response.data.data
                    setIsLogin(true)
                    setUserData(data)
                    setState(data)
                    break
                case 400:
                case 401:
                    setIsLogin(false)
                    break
            }
        }

        getIsLogin()


    }, [props.location.key]);

    const logout = () => {
        removeCookie('access_token')
        props.history.push('/')
    }

    return (
        <div>
            <Link to={"/"}>멋진 로고</Link>

            {
                isLogin &&
                <div style={{"text-align": "right", "display": "inline-block"}}>
                    <div style={{"display": "inline-block"}}>
                        {/*{userInfo.info.nickname}*/}
                    </div>
                    <div style={{"display": "inline-block"}} onClick={logout}>
                        로그아웃
                    </div>
                </div>
            }
            {
                !isLogin &&
                <div style={{"text-align": "right", "display": "inline-block"}}>
                    <div style={{"display": "inline-block"}}>
                        <Link to={"/register"}>회원가입</Link>
                    </div>
                    <div style={{"display": "inline-block"}}>
                        <Link to={"/login"}>로그인</Link>
                    </div>
                </div>
            }

            {/*<SampleConsumer>*/}
            {/*    {*/}
            {/*        ({state, actions}) => (*/}
            {/*            <div>*/}
            {/*                현재 설정된 값: {state.value}*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    }*/}
            {/*</SampleConsumer>*/}

        </div>
    )
};

export default withRouter(Navbar);
