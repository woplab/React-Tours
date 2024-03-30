// app/store.ts

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import the combined reducer

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Export RootState type

// Define AppThunk type
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;
