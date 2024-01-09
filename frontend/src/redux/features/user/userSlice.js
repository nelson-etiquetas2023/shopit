import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    isAuthenticated: false,
    error: null,
    user: null
}

const userSlice = createSlice ({

    name: "users",
    initialState,
    reducers: {
        //Login
        LOGIN_REQUEST: (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        LOGIN_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        LOGIN_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = false;
            state.error = action.payload;
        },
        //Register
        REGISTER_USERS_REQUEST: (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        REGISTER_USERS_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        REGISTER_USERS_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
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
    CLEAR_ERROR,
    REGISTER_USERS_REQUEST,
    REGISTER_USERS_SUCCESS,
    REGISTER_USERS_FAIL
} = userSlice.actions;

export default userSlice.reducer;


