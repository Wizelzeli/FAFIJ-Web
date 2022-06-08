import React from 'react';
import NoteItem from "../notes/NoteItem";
import CategoryItem from "./CategoryItem";

const CategoryList = (props) => {
    if (!props.categories.length) {
        return (
            <h2 style={{textAlign: 'center'}}>
                Категории не найдены.
            </h2>
        )
    }

    function parentDelete() {
        props.reload()
    }

    return (
        <div>
            <h2 style={{textAlign: 'center'}}>
                Список категорий
            </h2>
            {props.categories.map((category, index) =>
                <CategoryItem parentDelete={parentDelete} category={category} key={index}/>
            )}
        </div>
    );
};

export default CategoryList;