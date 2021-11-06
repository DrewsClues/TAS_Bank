import React from 'react';
import './App.css';
import Home from './home';
import Create from './create'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NavbarComp from './navbar';




export const UserContext = React.createContext();
function App(){

    const [active_email, setActive_email] = React.useState('');
    const [active_name, setActive_name] = React.useState('');
    const [active_account, setActive_account] = React.useState('');
    const [logged_state, setLogged_state] = React.useState(false);

    const emailValue = { active_email, setActive_email }
    const nameValue = { active_name, setActive_name }
    const accountValue = { active_account, setActive_account }
    const logValue = { logged_state, setLogged_state } 




    return (
        <UserContext.Provider value = {{ctx_name: nameValue, ctx_email: emailValue, ctx_account: accountValue, ctx_logged: logValue}}>
        <NavbarComp/>
        </UserContext.Provider>
    )
}

export default App;