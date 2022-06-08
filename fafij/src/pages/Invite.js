import React, {useState} from 'react';
import CustomInput from "../components/input/CustomInput";
import CustomButton from "../components/button/CustomButton";
import axios from "axios";

const Invite = () => {

    const [selectedRole, setSelectedRole] = useState('KID')
    const [userLogin, setUserLogin] = useState('')

    const stateKid = {
        titleKid:"Роль Kid обладает ограниченными возможностями, пользователи с этой ролью не смогут удалять или редактировать записи, не будут иметь возможность добавить или удалить категорию. Приглашения других пользователей в журнал им так же недоступно."
    }
    const stateAdult = {
        titleKid:"Роль Adult имеет все возможности, наряду с ролью Admin, создателя журнала, за исключением функции приглашения другого пользователя в журнал."
    }

    async function inviteUser(event) {
        event.preventDefault();
        const json = JSON.stringify({
            journalName: localStorage.getItem('journal'),
            login: userLogin,
            role: selectedRole,
            admin: localStorage.getItem('login'),
        });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        axios.post('http://localhost:8081/private/addUser', json, {headers})
            .then(response => {
                console.log(response)
            })
    }

    return (
        <div>
            <h2>Пригласить пользователя</h2>
            <form onSubmit={inviteUser}>
                <CustomInput onChange={e => setUserLogin(e.target.value)}
                             type="text"
                             placeholder="Логин пользователя"/>
                <div>
                    <div style={{display: "inline-block", margin: "10px"}}>
                        <CustomInput onChange={e => setSelectedRole(e.target.value)}
                                     type="radio"
                                     value="KID"
                                     checked={selectedRole === "KID"}/>
                        <p>Kid</p>
                    </div>
                    <div style={{display: "inline-block"}}>
                        <CustomInput onChange={e => setSelectedRole(e.target.value)}
                                     type="radio"
                                     value="ADULT"
                                     checked={selectedRole === "ADULT"}/>
                        <p>Adult</p>
                    </div>
                </div>
                <CustomButton>Пригласить</CustomButton>
            </form>
            <p className='item__content'><br/>Роль <strong>Adult</strong> имеет все возможности, наряду с ролью Admin, создателя журнала, за исключением функции приглашения другого пользователя в журнал.<br/><br/></p>
            <p className='item__content'>Роль <strong>Kid</strong> обладает ограниченными возможностями, пользователи с этой ролью не смогут удалять или редактировать записи, не будут иметь возможность добавить или удалить категорию. Приглашения других пользователей в журнал им так же недоступно.</p>
        </div>
    );
};

export default Invite;