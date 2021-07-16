import React from "react";
import { useDispatch } from "react-redux";

import { setSelectedBook } from "../../redux/actions/books";

import "./card.scss";

interface Iprops {
    id: string;
    title: string;
    image?: string;
    category?: string;
    authors?: string[];
}

const Cards: React.FC<Iprops> = ({ id, title, image, category, authors }) => {
    const dispatch = useDispatch();

    const selectBook = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(setSelectedBook(id));
    };

    return (
        <div className="card-block" onClick={(e) => selectBook(e)}>
            <div className="card-block__image">
                {image && <img src={image} alt={title} />}
            </div>
            <p className="card-block__category">{category} </p>
            <h3 className="card-block__title">{title}</h3>
            <div className="card-block__authors">
                {authors && <p>{authors.join(", ")}</p>}
            </div>
        </div>
    );
};

export default Cards;
