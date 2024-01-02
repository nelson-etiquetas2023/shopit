import axios from 'axios'

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERROR
} from './userSlice.js';

// Login.
export const login = (email, password) => async (dispatch) => {

    try {
    
        dispatch(LOGIN_REQUEST());

        const {data} = await axios({
            method: 'post',
            url: 'http://localhost:4000/api/v1/login',
            data: {email, password},
            headers: 'ContentType: application/json'
        });

        console.log(data)
                                         
        dispatch(LOGIN_SUCCESS({
            user: data.user
        }))

        
    } catch (error) {
        dispatch(LOGIN_FAIL({
            error: 'SIN CREDENCIALES: NO AUTORIZADO'
        }));
    }
} 

export const clearErrors = () => async ( dispatch ) => {
    dispatch(CLEAR_ERROR());
}





