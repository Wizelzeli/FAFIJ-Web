import React from 'react';
import JournalItem from "./JournalItem";

const JournalList = ({journals}) => {

    if (!journals.length) {
        return (
            <h2 style={{textAlign: 'center'}}>
                Журналы не найдены.
            </h2>
        )
    }

    return (
        <div>
            <h2 style={{textAlign: 'center'}}>
                Список доступных жунралов
            </h2>
            {journals.map((journal, index) =>
                <JournalItem journal={journal} key={index}/>

            )}
        </div>
    );
};

export default JournalList;