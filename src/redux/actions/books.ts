import { Dispatch } from "redux";
import { booksApi } from "../../api";
import { IsearchData, Idata } from "../../interfaces";

export const setBooks = (items: Idata) => ({
    type: "BOOKS:SET_BOOKS",
    payload: items,
});

export const setTotal = (num: number) => ({
    type: "BOOKS:SET_TOTAL",
    payload: num,
});

export const setLoading = (bool: boolean) => ({
    type: "BOOKS:SET_LOADING",
    payload: bool,
});

export const setSelectedBook = (id: null | string) => ({
    type: "BOOKS:SET_SELECTED_BOOK",
    payload: id,
});

export const setSearchData = (obj: null | IsearchData) => ({
    type: "BOOKS:SET_SEARCH_DATA",
    payload: obj,
});

export const fetchBooks =
    (
        search: string,
        category: string,
        sorting: string,
        startIndex: string,
        newQuery: boolean,
    ) =>
    (dispatch: Dispatch) => {
        dispatch(
            setSearchData({
                search,
                category,
                sorting,
                startIndex,
            }),
        );
        booksApi
            .getBooks(search, category, sorting, startIndex)
            .then(({ data }) => {
                if(data.items) {
                    let books: any[] = [];
                    data.items.map((item: any) => {
                        item.volumeInfo.id = item.id;
                        return books.push(item.volumeInfo);
                    });
                    dispatch(setBooks({ books, newQuery }));
                    dispatch(setTotal(data.totalItems));
                    dispatch(setLoading(false));
                } else {
                    dispatch(setLoading(false));
                    alert("Нет больше книг по вашему запросу")
                }
            })
            .catch((ex) => {
                const error =
                    ex.response.status === 404
                        ? "Resource Not found"
                        : "An unexpected error has occurred";
                alert(error);
            });
    };
