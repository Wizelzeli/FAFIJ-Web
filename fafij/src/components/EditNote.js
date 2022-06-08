import React, {useEffect, useState} from 'react';
import CustomInput from "./input/CustomInput";
import CustomButton from "./button/CustomButton";
import axios from "axios";

const EditNote = (props) => {
    const [editNote, setEditNote] = useState({sum: '', category: '', comment: '',})

    async function editNoteRequest(event) {
        event.preventDefault();
        const json = JSON.stringify({
            id: props.note.id,
            date: props.note.date,
            sum: parseInt(editNote.sum),
            category: editNote.category,
            comment: editNote.comment,
            login: localStorage.getItem('login')
        });
        console.log(json)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        axios.post('http://localhost:8081/private/updateNote', json, {headers})
            .then(response => {
                setEditNote({sum: '', category: '', comment: '',})
                console.log(response)
                props.hideModal()
            })
    }

    return (
        <div>
            <h3>Редактирование записи</h3>
            <form onSubmit={editNoteRequest}>
                <CustomInput onChange={e => setEditNote({...editNote, sum: e.target.value})}
                             type="number"
                             value={editNote.sum}
                             placeholder="Сумма"/>
                <CustomInput onChange={e => setEditNote({...editNote, category: e.target.value})}
                             type="text"
                             value={editNote.category}
                             placeholder="Категория"/>
                <CustomInput onChange={e => setEditNote({...editNote, comment: e.target.value})}
                             type="text"
                             value={editNote.comment}
                             placeholder="Комментарий"/>
                <CustomButton>Отредактировать</CustomButton>
            </form>
        </div>
    );
};

export default EditNote;