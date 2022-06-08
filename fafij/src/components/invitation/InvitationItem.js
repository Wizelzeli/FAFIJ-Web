import React from 'react';
import axios from "axios";
import CustomButton from "../button/CustomButton";

const InvitationItem = (props) => {

    const acceptDecline = () => {
        props.parentAcceptDecline();
    };

    async function accept() {
        const json = JSON.stringify({
            login: localStorage.getItem('login'),
            journalName: props.invitation.journalName.journalName,
        });
        console.log(json)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        axios.post('http://localhost:8081/private/accept', json, {headers})
            .then(response => {
                if(response.status === 201 || response.status === 200) acceptDecline()
            })
    }

    async function decline() {
        const json = JSON.stringify({
            login: localStorage.getItem('login'),
            journalName: props.invitation.journalName.journalName,
        });
        console.log(json)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        axios.post('http://localhost:8081/private/decline', json, {headers})
            .then(response => {
                if(response.status === 201 || response.status === 200) acceptDecline()
            })
    }


    return (
        <div className="item">
            <div className="item__content">
                <div>
                    <p>Название журнала: {props.invitation.journalName.journalName}</p>
                    <p>Роль: {props.invitation.role.name}</p>
                </div>
            </div>
            <div className="item__buttons">
                <CustomButton onClick={() => {
                    accept()
                }}>
                    Принять
                </CustomButton>
                <CustomButton onClick={() => {
                    decline()
                }}>
                    Отклонить
                </CustomButton>
            </div>
        </div>
    );
};

export default InvitationItem;