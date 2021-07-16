import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, setLoading } from "../../redux/actions/books";

import { Card, Loader, BookPage } from "..";
import { RootState } from "../../redux/reducers";

import "./cards.scss";

const Cards = () => {
    const books = useSelector((state: RootState) => state.books.books);
    const total = useSelector((state: RootState) => state.books.total);
    const loading = useSelector((state: RootState) => state.books.loading);
    const searchData = useSelector(
        (state: RootState) => state.books.searchData,
    );
    const selectedBook = useSelector(
        (state: RootState) => state.books.selectedBook,
    );

    const dispatch = useDispatch();

    const onLoadMore = () => {
        if (searchData) {
            const newQuery = false;
            const newIndex = String(+searchData.startIndex + 30);
            dispatch(setLoading(true));
            dispatch(
                fetchBooks(
                    searchData.search,
                    searchData.category,
                    searchData.sorting,
                    newIndex,
                    newQuery,
                ),
            );
        }
    };
    return (
        <>
            {!selectedBook ? (
                <div className="cards-block">
                    {loading && (
                        <div className="cards-block__loader">
                            <Loader />
                        </div>
                    )}
                    {total && (
                        <>
                            <div className="cards-block__total">
                                <p>Found: {total} results</p>
                            </div>
                            {books.map((book, index) => (
                                <Card
                                    key={index}
                                    id={book.id}
                                    title={book.title}
                                    image={
                                        book.imageLinks
                                            ? book.imageLinks.thumbnail
                                            : null
                                    }
                                    category={
                                        book.categories
                                            ? book.categories[0]
                                            : null
                                    }
                                    authors={book.authors}
                                />
                            ))}
                            {loading ? (
                                <div className="cards-block__loader">
                                    <Loader />
                                </div>
                            ) : (
                                <div className="cards-block__btn">
                                    <button onClick={onLoadMore}>
                                        Load More...
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            ) : (
                <BookPage selectedBook={selectedBook} />
            )}
        </>
    );
};

export default Cards;
