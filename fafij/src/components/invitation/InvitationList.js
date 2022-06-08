import React from 'react';
import NoteItem from "../notes/NoteItem";
import InvitationItem from "./InvitationItem";

const InvitationList = (props) => {
    if (!props.invitations.length) {
        return (
            <h2 style={{textAlign: 'center'}}>
                Приглашения не найдены.
            </h2>
        )
    }

    function parentAcceptDecline() {
        props.reload()
    }

    console.log(props.invitations)
    return (
        <div>
            <h2 style={{textAlign: 'center'}}>
                Список приглашений
            </h2>
            {props.invitations.map((invitation, index) =>
                <InvitationItem parentAcceptDecline={parentAcceptDecline} invitation={invitation} key={index}/>
            )}
        </div>
    );
};

export default InvitationList;