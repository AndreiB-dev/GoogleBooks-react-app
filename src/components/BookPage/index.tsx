import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/reducers";

import "./bookPage.scss";

interface Iprops {
    selectedBook: string;
}

const BookPage: React.FC<Iprops> = ({ selectedBook }) => {
    const books = useSelector((state: RootState) => state.books.books);

    const book = books.find((item) => item.id === selectedBook);

    return (
        <div className="book-page">
            <div className="book-page__image">
                <div className="book-page__image-pic">
                    {book.imageLinks && <img src={book.imageLinks.thumbnail} alt={book.title} />}
                </div>
            </div>
            <div className="book-page__info">
                <p className="book-page__info-categories">
                    {book.categories ? book.categories.join(" / ") : null}
                </p>
                <h3 className="book-page__info-title">{book.title}</h3>
                <p className="book-page__info-authors">
                    {book.authors ? book.authors.join(", ") : null}
                </p>
                <div className="book-page__info-description">
                    {book.description}
                </div>
            </div>
        </div>
    );
};

export default BookPage;
