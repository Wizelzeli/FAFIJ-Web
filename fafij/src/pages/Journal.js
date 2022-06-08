import React, {useEffect, useState} from 'react';
import axios from "axios";
import CustomInput from "../components/input/CustomInput";
import CustomButton from "../components/button/CustomButton";
import NoteList from "../components/notes/NoteList";
import ModalWindow from "../components/modal/ModalWindow";
import EditNote from "../components/EditNote";

const Journal = () => {
    const [response, setResponse] = useState([])
    const [note, setNote] = useState({sum: 0, category: '', comment: '', journalName: ''})
    const [editableNote, setEditableNote] = useState({id: '', date: '', sum: '', category: {name: ''}, comment: ''})
    const [modalWindow, setModalWindow] = useState(false)


    useEffect(() => {
        getNotes()
    }, [])

    async function createNote(event) {
        event.preventDefault();
        Number.prototype.padLeft = function (base, chr) {
            const len = (String(base || 10).length - String(this).length) + 1;
            return len > 0 ? new Array(len).join(chr || '0') + this : this;
        }
        const d = new Date
        console.log(d)
        const dateformat = [
            (d.getMonth() + 1).padLeft(),
            d.getDate().padLeft(),
            (d.getFullYear() - 2)
        ].join('.') + ' ' + [
            d.getHours().padLeft(),
            d.getMinutes().padLeft(),
            d.getSeconds().padLeft()
        ].join(':');
        console.log(dateformat)
        const json = JSON.stringify({
            date: dateformat,
            sum: note.sum,
            category: note.category,
            comment: note.comment,
            journalName: note.journalName
        });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        axios.post('http://localhost:8081/private/addNote', json, {headers})
            .then(response => {
                console.log(response)
                const form = event.target;
                form.reset();
                setNote({sum: 0, category: '', comment: '', journalName: ''})
                getNotes()
            })
    }

    async function getNotes() {
        const json = JSON.stringify({
            journalName: localStorage.getItem('journal'),
        });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        axios.post('http://localhost:8081/private/listNote', json, {headers})
            .then(response => {
                console.log(response)
                setResponse(response.data)
            })
    }

    function hideModal() {
        setModalWindow(false)
        getNotes()
    }

    function edit(note) {
        setEditableNote(note)
        setModalWindow(true)
    }

    return (

        <div>
            <ModalWindow visible={modalWindow} setVisible={setModalWindow}>
                <EditNote note={editableNote} hideModal={hideModal}/>
            </ModalWindow>

            <h2>Создать запись</h2>
            <form onSubmit={createNote}>
                <CustomInput onChange={e => setNote({...note, sum: e.target.value})}
                             type="number"
                             placeholder="Сумма"/>
                <CustomInput onChange={e => setNote({...note, category: e.target.value})}
                             type="text"
                             placeholder="Категория"/>
                <CustomInput onChange={e => setNote({...note, comment: e.target.value})}
                             type="text"
                             placeholder="Комментарий"/>
                <CustomButton onClick={() => {
                    setNote({...note, journalName: localStorage.getItem('journal')})
                }}>Создать</CustomButton>
            </form>
            <NoteList notes={response} reload={getNotes} edit={edit}/>
        </div>
    );
};

export default Journal;