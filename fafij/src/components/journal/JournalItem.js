import React, {useContext, useState} from 'react';
import CustomButton from "../button/CustomButton";
import {Context} from "../../index";
import {useNavigate} from "react-router";
import axios from "axios";


const JournalItem = (props) => {
    const navigate = useNavigate()
    const {hasJournal, setHasJournal} = useContext(Context);
    const {journal, setJournal} = useContext(Context);
    const {isAdult, setIsAdult} = useContext(Context);
    const {isAdmin, setIsAdmin} = useContext(Context);

    function getRole(event) {
        event.preventDefault();
        const json = JSON.stringify({
            login: localStorage.getItem('login'),
            journalName: props.journal.journalName
        });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        return axios.post('http://localhost:8081/private/userRole', json, {headers})
            .then(response => response)
    }

    const stringLogins = (logins) => {
        let loginsString = "";
        logins.map((login) => {
            loginsString = loginsString.concat(" ".concat(login.login))
        })
        return loginsString
    }

    return (
        <div className="item">
            <div className="item__content">
                <strong style={{maxWidth: '400px'}}>{props.journal.journalName}</strong>
                <p>{stringLogins(props.journal.logins)}</p>
            </div>
            <div className="item__buttons">
                <CustomButton onClick={(event) => {
                    getRole(event).then(response => {
                            console.log(response)
                            if (response.status === 200) {
                                switch (response.data) {
                                    case 1:
                                        setIsAdmin(true)
                                        setIsAdult(true)
                                        localStorage.setItem('isAdmin', 'true')
                                        localStorage.setItem('isAdult', 'true')
                                        break;
                                    case 2:
                                        setIsAdmin(false)
                                        setIsAdult(true)
                                        localStorage.setItem('isAdmin', 'false')
                                        localStorage.setItem('isAdult', 'true')
                                        break;
                                    case 3:
                                        setIsAdmin(false)
                                        setIsAdult(false)
                                        localStorage.setItem('isAdmin', 'false')
                                        localStorage.setItem('isAdult', 'false')
                                        break;
                                    default:
                                        console.log("something go wrong")
                                }
                                localStorage.setItem('hasJournal', 'true')
                                localStorage.setItem('journal', props.journal.journalName)
                                setHasJournal(true);
                                setJournal(props.journal.journalName)
                                navigate(`/journal`)
                            }
                        }
                    )
                }}>
                    Выбрать
                </CustomButton>
            </div>
        </div>
    );
};

export default JournalItem;