import axios from "axios";

import {
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
  UPDATE_PROFILE_FAIL,
} from "./userSlice.js";

// Login.
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(LOGIN_REQUEST());

    const { data } = await axios({
      method: "post",
      url: "http://localhost:4000/api/v1/login",
      data: { email, password },
      headers: "ContentType: application/json",
      withCredentials: true,
    });

    dispatch(
      LOGIN_SUCCESS({
        user: data.user,
      })
    );
  } catch (error) {
    dispatch(
      LOGIN_FAIL({
        error: "SIN CREDENCIALES: NO AUTORIZADO",
      })
    );
  }
};

// Register.
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(REGISTER_USERS_REQUEST());

    const { data } = await axios({
      method: "post",
      url: "http://localhost:4000/api/v1/register",
      data: userData,
      headers: "ContentType: multipart/form-data",
    }).catch(function (error) {
      console.log(error);
    });

    dispatch(
      REGISTER_USERS_SUCCESS({
        user: data.user,
      })
    );
  } catch (error) {
    dispatch(
      REGISTER_USERS_FAIL({
        payload: error.response.data.message,
      })
    );
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LOAD_USER_REQUEST());

    const { data } = await axios({
      method: "get",
      url: "http://localhost:4000/api/v1/profile",
    });

    dispatch(
      LOAD_USER_SUCCESS({
        user: data.user,
      })
    );
  } catch (error) {
    dispatch(
      LOAD_USER_FAIL({
        error: error.response.data.message,
      })
    );
  }
};

export const closeSession = () => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "get",
      url: "http://localhost:4000/api/v1/logout",
    });

    console.log(data);

    dispatch(CERRAR_SESSION_SUCCESS());
  } catch (error) {
    dispatch(
      CERRAR_SESSION_FAIL({
        error: error.response.data.message,
      })
    );
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch(CLEAR_ERROR());
};

//Update Users
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(UPDATE_PROFILE_REQUEST());

    const { data } = await axios({
      method: "put",
      url: "http://localhost:4000/api/v1/profile/update",
      data: userData,
      headers: "ContentType: multipart/form-data",
    });

    dispatch(
      UPDATE_PROFILE_SUCCESS({
        user: data.user,
      })
    );
  } catch (error) {
    dispatch(
      UPDATE_PROFILE_FAIL({
        payload: error.response.data.message,
      })
    );
  }
};

//update password
export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch(UPDATE_PASSWORD_REQUEST());

    const { data } = await axios({
      method: "put",
      url: "http://localhost:4000/api/v1/password/update",
      data: password,
      headers: "ContentType: application/json",
      withCredentials: true,
    }).catch((error) => {
      console.log(error);
    });

    dispatch(
      UPDATE_PASSWORD_SUCCESS({
        user: data.user,
      })
    );
  } catch (error) {
    dispatch(
      UPDATE_PASSWORD_FAIL({
        payload: error.response,
      })
    );
  }
};
