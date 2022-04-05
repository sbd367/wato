import React, { useState } from "react";
import axios from "axios";

const GlobalState = React.createContext({
    isLoggedIn: false,
    userToken: "",
    userData: {},
    logIn: (un, pw) => {},
    logOut: (login) => {},
    createUser: (un, pw) => {}
})

export const GlobalStateProvidor = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userToken, setUserToken] = useState("");
    const [userData, setUserData] = useState({});
    const logIn = (username, password) => {
        axios.get("Wato-env.eba-miaw9we4.us-east-1.elasticbeanstalk.com/api/v1/user/login", {
            params: {
                username: username,
                password: password
            }
        }).then(res => {
            console.log(res);
            if(res.status === 200 ) {
                setUserData(res.data);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        })
    }
    const logOut = (user) => {
        //POST req to user auth
        setIsLoggedIn(false);
        setUserData({});
    }
    const createUser = (username, password) => {
        axios.post("Wato-env.eba-miaw9we4.us-east-1.elasticbeanstalk.com/api/v1/user", {
            username: username,
            password: password
        }).then(res => {
            if(res.status === 200) console.log('Sucess post to users', res);
            setIsLoggedIn(true);
        })
    }
    return(
        <GlobalState.Provider value={
            {
                isLoggedIn: isLoggedIn,
                userToken: userToken,
                userData: userData,
                logIn: logIn,
                logOut: logOut,
                createUser: createUser
            }}>
        {props.children}
        </GlobalState.Provider>
    )
}

export default GlobalState;