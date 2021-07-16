import React from "react";
import { useDispatch } from "react-redux";

import {
    fetchBooks,
    setLoading,
    setSelectedBook,
} from "../../redux/actions/books";

import BackgroundImg from "../../assets/image/books.jpeg";
import "./search.scss";

const Search = () => {
    const categories = [
        "all",
        "art",
        "biography",
        "computers",
        "history",
        "medical",
        "poetry",
    ];
    const sorting = ["relevance", "newest"];
    const startIndex = "0";

    const dispatch = useDispatch();

    const [searchInput, setSearchInput] = React.useState<string>("");
    const [categorySelect, setCategorySelect] =
        React.useState<string>("all");
    const [sortingSelect, setSortingSelect] =
        React.useState<string>("relevance");
    const [tooltipVisible, setTooltipVisible] = React.useState<boolean>(false);

    const options = categories.map((category, index) => (
        <option key={index} value={category}>
            {category}
        </option>
    ));
    const sortOptions = sorting.map((item, index) => (
        <option key={index} value={item}>
            {item}
        </option>
    ));

    const onFetchBooks = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchInput === "" && categorySelect === "all") {
            setTooltipVisible(true);
        } else {
            const newQuery = true;
            dispatch(setLoading(true));
            dispatch(setSelectedBook(null));
            dispatch(
                fetchBooks(
                    searchInput,
                    categorySelect,
                    sortingSelect,
                    startIndex,
                    newQuery,
                ),
            );
            setSearchInput("");
        }
    };

    return (
        <div
            className="search-block"
            style={{ backgroundImage: `url(${BackgroundImg})` }}>
            <h2>Search for books</h2>
            <form
                className="search-block__form"
                onSubmit={(e) => onFetchBooks(e)}>
                <div className="search-block__form-input">
                    <span
                        {...(tooltipVisible && {
                            tooltip:
                                "Введите текст для поиска и/или выберите категорию",
                        })}>
                        <input
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                                setTooltipVisible(false);
                            }}
                        />
                        <button type="submit">Search</button>
                    </span>
                </div>
                <div className="search-block__selects">
                    <div>
                        <p>Categories</p>
                        <select
                            value={categorySelect}
                            onChange={(e) => {
                                setCategorySelect(e.target.value);
                                setTooltipVisible(false);
                            }}>
                            {options}
                        </select>
                    </div>
                    <div>
                        <p>Sorting by</p>
                        <select
                            value={sortingSelect}
                            onChange={(e) => setSortingSelect(e.target.value)}>
                            {sortOptions}
                        </select>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Search;
