import React, { useState } from "react";

const GlobalState = React.createContext({
    isLoggedIn: false,
    user: {},
    setUserIsNotLoggedIn: (logged) => {},
    setUserLoggedIn: (login) => {},
    setTheUser: (id) => {}
})

export const GlobalStateProvidor = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const setUserLoggedIn = () => {
        setIsLoggedIn(true);
    }
    const setTheUser = (user) => {
        console.log('runs')
        setUser(user);
    }
    const setUserIsNotLoggedIn = () => {
        setIsLoggedIn(false);
    }
    return(
        <GlobalState.Provider value={
            {
                isLoggedIn: isLoggedIn,
                user: user,
                setUserLoggedIn: setUserLoggedIn,
                setUserIsNotLoggedIn: setUserIsNotLoggedIn,
                setTheUser: setTheUser
            }}>
        {props.children}
        </GlobalState.Provider>
    )
}

export default GlobalState;