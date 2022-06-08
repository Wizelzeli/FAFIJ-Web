import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import CustomInput from "../components/input/CustomInput";
import CustomButton from "../components/button/CustomButton";
import CategoryList from "../components/category/CategoryList";
import {Context} from "../index";

const Categories = () => {
    const [response, setResponse] = useState([{name: ''}])
    const [category, setCategory] = useState('')
    const {isAdult, setIsAdult} = useContext(Context);

    useEffect(() => {
        getCategories()
    }, [])

    async function createCategory(event) {
        event.preventDefault();
        const json = JSON.stringify({
            category: category,
            login: localStorage.getItem('login'),
            journalName: localStorage.getItem('journal')
        });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        axios.post('http://localhost:8081/private/addCategory', json, {headers})
            .then(response => {
                console.log(response)
                getCategories()
            })
    }

    async function getCategories() {
        const json = JSON.stringify({
            journalName: localStorage.getItem('journal'),
        });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        axios.post('http://localhost:8081/private/listCategory', json, {headers})
            .then(response => {
                console.log(response)
                setResponse(response.data)
            })
    }

    return (
        isAdult
            ?
            <div>
                <h2>Создать категорию</h2>
                <form onSubmit={createCategory}>
                    <CustomInput onChange={e => setCategory(e.target.value)}
                                 type="text"
                                 placeholder="Название категории"/>
                    <CustomButton>Создать</CustomButton>
                </form>
                <CategoryList categories={response} reload={getCategories}/>
            </div>
            :
            <div>
                <CategoryList categories={response} reload={getCategories}/>
            </div>
    );
};

export default Categories;