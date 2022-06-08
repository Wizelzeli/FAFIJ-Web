import React, {useContext, useState} from 'react';
import CustomInput from "../components/input/CustomInput";
import CustomButton from "../components/button/CustomButton";
import {Context} from "../index";
import axios from "axios";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(Context);
    const {login, setLogin} = useContext(Context);
    const {token, setToken} = useContext(Context);
    const [user, setUser] = useState({login: '', password: ''})
    const [message, setMessage] = useState('')

    async function logIn(event) {
        event.preventDefault();
        const json = JSON.stringify({
            login: user.login,
            password: user.password
        });
        const headers = {
            'Content-Type': 'application/json',
        };
        axios.post('http://localhost:8081/login', json , { headers })
            .then(response => {
                console.log(response);
                if (response.status === 401) setMessage("Неверное имя пользователя или пароль")
                if (response.status === 500) setMessage("Внутренняя ошибка сервера")
                setIsAuth(true);
                setToken(response.data.jwtToken);
                setLogin(user.login);

                localStorage.setItem('auth', 'true');
                localStorage.setItem('token', response.data.jwtToken);
                localStorage.setItem('login', user.login);
            })
    }

    return (
        <div>
            <h2>Авторизация</h2>
            <form style={{width: '500px'}} onSubmit={logIn}>
                <CustomInput onChange={e => setUser({...user, login: e.target.value})}
                             type="text"
                             placeholder="Логин"/>
                <CustomInput onChange={e => setUser({...user, password: e.target.value})}
                             type="password"
                             placeholder="Пароль"/>
                <CustomButton>Войти</CustomButton>
            </form>
        </div>
    );
};

export default Login;