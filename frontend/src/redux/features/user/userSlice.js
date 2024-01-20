import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  error: null,
  user: null,
  isUpdate: null,
};

const userSlice = createSlice({
  name: "auth",
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
      state.user = action.payload.user;
    },
    LOGIN_FAIL: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = false;
      state.error = action.payload.error;
    },
    //Register
    REGISTER_USERS_REQUEST: (state, action) => {
      state.loading = true;
    },
    REGISTER_USERS_SUCCESS: (state, action) => {},
    REGISTER_USERS_FAIL: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload.error;
    },
    //carga de usuario.
    LOAD_USER_REQUEST: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    LOAD_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    LOAD_USER_FAIL: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    CERRAR_SESSION_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    CERRAR_SESSION_FAIL: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload.error;
    },
    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
    UPDATE_PASSWORD_REQUEST: (state, action) => {
      state.loading = true;
    },
    UPDATE_PASSWORD_SUCCESS: (state, action) => {
      state.loading = false;
    },
    UPDATE_PASSWORD_FAIL: (state, action) => {
      state.loading = false;
    },

    UPDATE_PROFILE_REQUEST: (state, action) => {
      state.loading = true;
    },
    UPDATE_PROFILE_SUCCESS: (state, action) => {
      state.loading = false;
      state.isUpdate = action.payload;
    },

    UPDATE_PROFILE_RESET: (state, action) => {
      state.isUpdate = false;
    },
    UPDATE_PROFILE_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
  REGISTER_USERS_REQUEST,
  REGISTER_USERS_SUCCESS,
  REGISTER_USERS_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  CERRAR_SESSION_SUCCESS,
  CERRAR_SESSION_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
} = userSlice.actions;

export default userSlice.reducer;
