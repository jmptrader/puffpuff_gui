/**
 *  this Component is responsible for user signup,
 *  login update actions for the store to dispatch
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store'
import { IUser, ILogin, ISignUp, IUserDB } from './../interfaces'

/** correspondind strings to represent the type of action to dispatch */
export const AUTH_LOGIN = '[AUTH]_LOGIN'
export const AUTH_SIGNUP = '[AUTH]_SIGNUP'
export const AUTH_FAILURE = '[AUTH]_FAILURE'
export const AUTH_DETAILS = '[AUTH]_DETAILS'
export const AUTH_LOCAL_DETAILS = '[AUTH]_LOCAL_DETAILS'
export const AUTH_UPDATE = '[AUTH]_UPDATE'
export const AUTH_LOGOUT = '[AUTH]_LOGOUT'
export const AUTH_SUCCESS = '[AUTH]_SUCCESS'
export const AUTH_SAVE_LOCAL_DETAILS = '[AUTH]_SAVE_LOCAL_DETAILS'

@Injectable()
export class AuthActions {

    constructor() { }

    authSuccess(user: IUserDB): Action {
        return {
            type: AUTH_SUCCESS,
            payload: user
        }
    }

    /** 
     * authLogin(data)
     * takes the login and returns a AUTH_LOGIN action */
    authLogin(data: ILogin): Action {
        return {
            type: AUTH_LOGIN,
            payload: data
        }
    }

    /** 
     * authSignUp(data)
     * takes a signup data and return an action for the signup */
    authSignUp(data: ISignUp): Action {
        return {
            type: AUTH_SIGNUP,
            payload: data
        }
    }

    /**
     *authFailure() returns an action if the auth fail
     */
    authFailure(err): Action {
        return {
            type: AUTH_FAILURE,
            payload: err
        }
    }

    /**
     * user(token)
     * returns a action to return the user details from the server
     */
    user(token): Action {
        return {
            type: AUTH_DETAILS,
            payload: token
        }
    }

    /**
 * loacalUser()
 * returns a action to return the user details from the store
 */
    localUser(): Action {
        return {
            type: AUTH_LOCAL_DETAILS
        }
    }

    /**
     *  updateUser(token, user)
     *  returns an action with the user has payload
     * */
    updateUser(token: string, user: IUser): Action {
        return {
            type: AUTH_UPDATE,
            payload: {
                token,
                user
            }
        }
    }

    /**savelocalUser(token, user)
     *  save users to the localm db */
    savelocalUser(data: IUserDB): Action {        
        return {
            type: AUTH_SAVE_LOCAL_DETAILS,
            payload: {
                token: data.token,
                user: data.user
            }
        }
    }

    /** 
     * logOut()
     * returns an action to logout from the server */
    logOut(): Action {
        return {
            type: AUTH_LOGOUT
        }
    }

}
