import { combineReducers } from "redux";

import { default as books } from "./books";

export const rootReducer = combineReducers({
    books,
});

export type RootState = ReturnType<typeof rootReducer>;
