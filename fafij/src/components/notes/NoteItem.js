import React, {useContext} from 'react';
import CustomButton from "../button/CustomButton";
import axios from "axios";
import {Context} from "../../index";

const NoteItem = (props) => {
    const {isAdult, setIsAdult} = useContext(Context);

    const deleteSuccess = () => {
        props.parentDelete();
    };

    const editIntent = (note) => {
        props.parentEditIntent(note);
    };

    async function deleteNote() {
        const json = JSON.stringify({
            idNote: props.note.id,
            login: localStorage.getItem('login'),
            journalName: localStorage.getItem('journal'),
        });
        console.log(json)
        console.log(props.note.id)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        axios.post('http://localhost:8081/private/deleteNote', json, {headers})
            .then(response => {
                if (response.status === 201) deleteSuccess()
            })
    }

    return (
        isAdult
            ?
            <div className="item">
                <div className="item__content">
                    <div>
                        <p>Дата: {props.note.date}</p>
                        <p>Сумма: <strong>{props.note.sum}</strong></p>
                        <p>Категория: {props.note.category.name}</p>
                        <p>Комментарий: {props.note.comment}</p>
                    </div>
                </div>
                <div className="item__buttons">
                    <CustomButton onClick={() => {
                        editIntent(props.note)
                    }}>
                        Редактировать
                    </CustomButton>
                    <CustomButton onClick={() => {
                        deleteNote()
                    }}>
                        Удалить
                    </CustomButton>
                </div>
            </div>
            : <div className="item">
                <div>
                    <div>
                        <p>Дата: {props.note.date}</p>
                        <p>Сумма: <strong>{props.note.sum}</strong></p>
                        <p>Категория: {props.note.category.name}</p>
                        <p>Комментарий: {props.note.comment}</p>
                    </div>
                </div>
            </div>
    );
};

export default NoteItem;