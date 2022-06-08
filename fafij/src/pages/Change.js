import React, {useEffect, useState} from 'react';
import JournalList from "../components/journal/JournalList";
import CustomButton from "../components/button/CustomButton";
import CustomInput from "../components/input/CustomInput";
import axios from "axios";

const Change = () => {

    const [response, setResponse] = useState([])
    const [journalName, setJournalName] = useState('')

    useEffect(() => {
        getJournals()
    }, [])

    async function createJournal(event) {
        event.preventDefault();
        const json = JSON.stringify({
            login: localStorage.getItem('login'),
            journalName: journalName
        });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        axios.post('http://localhost:8081/private/createJournal', json , { headers })
            .then(response => {
                console.log(response)
                getJournals()
            })
    }

    async function getJournals() {
        const json = JSON.stringify({
            login: localStorage.getItem('login'),
        });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        axios.post('http://localhost:8081/private/userJournals', json, {headers})
            .then(response => {
                console.log(response)
                setResponse(response.data)
            })
    }

    return (
        <div>
            <h2>Создать журнал</h2>
            <form onSubmit={createJournal}>
                <CustomInput onChange={e => setJournalName(e.target.value)}
                             type="text"
                             placeholder="Название журнала"/>

                <CustomButton>Создать</CustomButton>
            </form>
            <JournalList journals={response}/>
        </div>
    );
};

export default Change;