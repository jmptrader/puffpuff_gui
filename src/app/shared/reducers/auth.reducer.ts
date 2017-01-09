import { Action, ActionReducer } from '@ngrx/store'
import { IUser } from './../interfaces'
import { AUTH_LOGOUT, AUTH_DETAILS, AUTH_FAILURE, AUTH_SUCCESS, AUTH_LOCAL_DETAILS } from './../actions'

export interface IAuth {
    login: boolean,
    user?: IUser
}

const initalState = { login: false }

export const AuthReducer: ActionReducer<IUser> = (state: IUser, action: Action) => {

    switch (action.type) {
        case AUTH_LOGOUT:
            return undefined
        case AUTH_SUCCESS:
            if (action.payload === undefined) return undefined
            return Object.assign({}, state, action.payload)
        case AUTH_FAILURE:
        default:
            return state
    }
}
