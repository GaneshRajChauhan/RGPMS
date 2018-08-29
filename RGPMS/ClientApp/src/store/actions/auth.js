import axios from 'axios';

import * as actionTypes from './actionTypes';
import Response from '../services/response';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('id_token');
    localStorage.removeItem('remember_me');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_permissions');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};
let baseUrl = () => {
    let base = '';

    if (window.location.origin)
        base = window.location.origin;
    else
        base = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

    return base.replace(/\/$/, '');
}
let newurl = baseUrl();


export const auth = (email, password, isSignup) => {
    return dispatch => {
        var headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let requestedBody = "username=" + email + "&password=" + password + "&grant_type=password&scope=openid%20email%20phone%20profile%20offline_access%20roles";
        let url = newurl + '/connect/token';
        console.log(url);
        if (!isSignup) {
            url = newurl + '/connect/token';
        }
        let res=new Response();
        axios.post(url, requestedBody, headers)
            .then(response => {
                

                res.processLoginResponse(response.data,true);
                var user=localStorage.current_user;
                var expiresIn=new Date(JSON.parse(localStorage.expires_in))-new Date();
                var newuser=JSON.parse(user);
                dispatch(authSuccess(response.data.access_token, newuser.id));
                dispatch(checkAuthTimeout(expiresIn/1000));

            })
            .catch(err => {


                dispatch(authFail(err.response.data.error));

            });
    };
};





export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = JSON.parse(localStorage.getItem('access_token'));
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(JSON.parse(localStorage.getItem('expires_in')));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const user = localStorage.getItem('current_user');
                const userId=(JSON.parse(user)).id;
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};