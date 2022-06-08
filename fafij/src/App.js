import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Context} from './index';
import NavBar from './NavBar';
import AppRouter from './AppRouter';


function App() {

    const [token, setToken] = useState(null);
    const [login, setLogin] = useState(null);
    const [journal, setJournal] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [hasJournal, setHasJournal] = useState(false);
    const [isAdult, setIsAdult] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        if (localStorage.getItem('login') != null) {
            setLogin(localStorage.getItem('login'))
        }
        if (localStorage.getItem('journal') != null) {
            setJournal(localStorage.getItem('journal'))
        }
        if (localStorage.getItem('token') != null) {
            setToken(localStorage.getItem('token'))
        }
        if (localStorage.getItem('hasJournal')) {
            setHasJournal(true)
        }
        if (localStorage.getItem('isAdult')) {
            setIsAdult(true)
        }
        if (localStorage.getItem('isAdmin')) {
            setIsAdmin(true)
        }
    }, [])

    return (
        <Context.Provider value ={{
            token, setToken,
            login, setLogin,
            journal, setJournal,
            isAuth, setIsAuth,
            hasJournal, setHasJournal,
            isAdult, setIsAdult,
            isAdmin, setIsAdmin
        }}>
            <BrowserRouter>
                <NavBar/>
                <AppRouter/>
            </BrowserRouter>
</Context.Provider>
    )
}

export default App;
