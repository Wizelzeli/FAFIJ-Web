import React, {useEffect, useState} from 'react';
import axios from "axios";
import InvitationList from "../components/invitation/InvitationList";

const Invitations = () => {
    const [response, setResponse] = useState([{journalName: {journalName: ''}, role: {name: ''}}])

    useEffect(() => {
        getInvitations()
    }, [])

    async function getInvitations() {
        const json = JSON.stringify({
            login: localStorage.getItem('login'),
        });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        axios.post('http://localhost:8081/private/invitations', json, {headers})
            .then(response => {
                console.log(response)
                setResponse(response.data)
            })
    }

    return (
        <div>
            <InvitationList invitations={response} reload={getInvitations}/>
        </div>
    );
};

export default Invitations;