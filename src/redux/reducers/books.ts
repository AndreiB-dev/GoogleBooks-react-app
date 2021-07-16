import { IsearchData } from "../../interfaces";

interface Istate {
    books: any[];
    total: null | number;
    loading: boolean;
    selectedBook: null | string;
    searchData: null | IsearchData;
}

const initialState: Istate = {
    books: [],
    total: null,
    loading: false,
    selectedBook: null,
    searchData: null,
};

export default function booksReducer(
    state = initialState,
    action: any,
): Istate {
    switch (action.type) {
        case "BOOKS:SET_BOOKS":
            if (action.payload.newQuery) {
                return {
                    ...state,
                    books: action.payload.books,
                };
            } else {
                return {
                    ...state,
                    books: [...state.books, ...action.payload.books],
                };
            }
        case "BOOKS:SET_TOTAL":
            return {
                ...state,
                total: action.payload,
            };
        case "BOOKS:SET_LOADING":
            return {
                ...state,
                loading: action.payload,
            };
        case "BOOKS:SET_SELECTED_BOOK":
            return {
                ...state,
                selectedBook: action.payload,
            };
        case "BOOKS:SET_SEARCH_DATA":
            return {
                ...state,
                searchData: action.payload,
            };
        default:
            return state;
    }
}
