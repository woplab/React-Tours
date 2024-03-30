// app/reducers/filtersSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
    price_per_day: string;
    duration: string;
    group_size: string;
    age_category: string;
    languages: string;
    destinations: string;
    attractions: string;
}

const initialState: FiltersState = {
    price_per_day: '',
    duration: '',
    group_size: '',
    age_category: '',
    languages: '',
    destinations: '',
    attractions: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        updateFilters(state, action: PayloadAction<Partial<FiltersState>>) {
            return { ...state, ...action.payload };
        },
        resetFilters(state) {
            return initialState;
        },
    },
});

export const { updateFilters, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
