import React, {useState} from 'react';
import NoteItem from "./NoteItem";

const NoteList = (props) => {


    if (!props.notes.length) {
        return (
            <h2 style={{textAlign: 'center'}}>
                Записи не найдены.
            </h2>
        )
    }

    function parentDelete() {
        props.reload()
    }

    function parentEditIntent(note) {
        props.edit(note)
    }

    return (
        <div>
            <h2 style={{textAlign: 'center'}}>
                Список записей
            </h2>
            {props.notes.map((note, index) =>
                <NoteItem parentDelete={parentDelete} parentEditIntent={parentEditIntent} note={note} key={index}/>
            )}
        </div>
    );
};

export default NoteList;