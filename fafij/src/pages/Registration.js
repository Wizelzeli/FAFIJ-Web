import React, {useContext, useState} from 'react';
import CustomInput from "../components/input/CustomInput";
import CustomButton from "../components/button/CustomButton";
import {Context} from "../index";
import axios from "axios";

const Registration = () => {

    const [user, setUser] = useState({login: '', password: ''})

    async function regIn(event) {
        event.preventDefault();
        const json = JSON.stringify({
            login: user.login,
            password: user.password
        });
        const headers = {
            'Content-Type': 'application/json',
        };
        axios.post('http://localhost:8081/registration', json, {headers})
            .then(response => {
                console.log(response);
            })
    }

    return (
        <div>
            <h2>Регистрация</h2>
            <form style={{width: '500px'}} onSubmit={regIn}>
                <CustomInput onChange={e => setUser({...user, login: e.target.value})}
                             type="text"
                             placeholder="Логин"/>
                <CustomInput onChange={e => setUser({...user, password: e.target.value})}
                             type="password"
                             placeholder="Пароль"/>
                <CustomButton>Зарегистрироваться</CustomButton>
            </form>
        </div>
    );
};

export default Registration;