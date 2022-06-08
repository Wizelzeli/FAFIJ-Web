import React, {useContext} from 'react';
import axios from "axios";
import CustomButton from "../button/CustomButton";
import {Context} from "../../index";

const CategoryItem = (props) => {
    const {isAdult, setIsAdult} = useContext(Context);

    const deleteSuccess = () => {
        props.parentDelete();
    };


    async function deleteCategory() {
        const json = JSON.stringify({
            category: props.category.name,
            login: localStorage.getItem('login'),
            journalName: localStorage.getItem('journal'),
        });
        console.log(json)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        axios.post('http://localhost:8081/private/deleteCategory', json, {headers})
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
                        <strong>{props.category.name}</strong>
                    </div>
                </div>
                <div className="item__buttons">
                    <CustomButton onClick={() => {
                        deleteCategory()
                    }}>
                        Удалить
                    </CustomButton>
                </div>
            </div>
            :
            <div className="item">
                <div className="item__content">
                    <div>
                        <strong>{props.category.name}</strong>
                    </div>
                </div>
            </div>
    );
};

export default CategoryItem;