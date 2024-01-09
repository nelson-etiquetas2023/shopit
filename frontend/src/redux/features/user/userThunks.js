import axios from "axios";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
  REGISTER_USERS_REQUEST,
  REGISTER_USERS_SUCCESS,
  REGISTER_USERS_FAIL,
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

export const clearErrors = () => async (dispatch) => {
  dispatch(CLEAR_ERROR());
};
