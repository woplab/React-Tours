// app/reducers/index.ts

import { combineReducers } from '@reduxjs/toolkit';
import toursReducer from './reducers/toursSlice';
import filtersReducer from './reducers/filtersSlice'; // Import the new filters reducer
import paginationReducer from './reducers/paginationSlice';

const rootReducer = combineReducers({
    tours: toursReducer,
    filters: filtersReducer,
    pagination: paginationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
