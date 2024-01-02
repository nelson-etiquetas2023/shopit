import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    isAuthenticate: false,
    error: null,
    user: null
}

const userSlice = createSlice ({

    name: "users",
    initialState,
    reducers: {
        LOGIN_REQUEST: (state, action) => {
            state.loading = true;
            state.isAuthenticate = false;
        },
        LOGIN_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticate = true;
            state.user = action.payload;
        },
        LOGIN_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticate = false;
            state.user = false;
            state.error = action.payload;
        },
        CLEAR_ERROR: (state, action) => {
            state.error = null;
        }
    }
});

export const { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERROR } = userSlice.actions;

export default userSlice.reducer;


