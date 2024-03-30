// app/reducers/toursSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store'; // Import AppThunk and RootState
import { Tour } from '../models'; // Import the Tour type

interface ToursState {
    tours: Tour[];
    loading: boolean;
    error: string | null;
}

const initialState: ToursState = {
    tours: [],
    loading: false,
    error: null,
};

const toursSlice = createSlice({
    name: 'tours',
    initialState,
    reducers: {
        fetchToursStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchToursSuccess(state, action: PayloadAction<Tour[]>) {
            state.loading = false;
            state.error = null;
            state.tours = action.payload;
        },
        fetchToursFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchToursStart, fetchToursSuccess, fetchToursFailure } = toursSlice.actions;

// Async action to fetch tours data
export const fetchTours = (): AppThunk => async (dispatch) => {
    dispatch(fetchToursStart());
    try {
        const response = await fetch('/data/tours/special-tours.json');
        if (!response.ok) {
            throw new Error('Failed to fetch tours');
        }
        const data = await response.json();
        dispatch(fetchToursSuccess(data.tours));
    } catch (error) {
        dispatch(fetchToursFailure('Error fetching tours'));
    }
};

export default toursSlice.reducer;
