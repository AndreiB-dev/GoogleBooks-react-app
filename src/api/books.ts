import { axios } from "../core/";

const booksApi = {
    getBooks: (
        search: string,
        category: string,
        sorting: string,
        startIndex: string,
    ) =>
        axios.get(
            `/volumes?q=${search}${
                category === "all" ? "" : "+subject:" + category
            }&orderBy=${sorting}&key=${process.env.REACT_APP_API_KEY}${
                startIndex === "0" ? "" : "&startIndex=" + startIndex
            }&maxResults=30`,
        ),
};

export default booksApi;
