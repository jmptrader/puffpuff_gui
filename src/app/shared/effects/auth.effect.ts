import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthActions } from './../actions/auth.action'
import { AuthService } from './../services/auth.service'
import { Observable } from 'rxjs/Observable'
import {
    AUTH_LOGIN, AUTH_SAVE_LOCAL_DETAILS,
    AUTH_SIGNUP, AUTH_UPDATE, AUTH_DETAILS,
    AUTH_LOCAL_DETAILS, AUTH_LOGOUT
} from './../actions'
import { AuthDB } from './../database'
import { IUserDB, IUser } from './../interfaces'

import { UtilEffect } from './util.effect'
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { ERRHANDLER } from './../../shared.extend'

@Injectable()
export class AuthEffect {

    private authDb: AuthDB = new AuthDB()
    constructor(private auth: AuthService, private authActions: AuthActions, private action$: Actions, private _util: UtilEffect) { }

    /**
     * login$
     * efect is triggered when user wants to login
     * is triggered */
    @Effect()
    login$: Observable<Action> = this.action$
        .ofType(AUTH_LOGIN)
        .map((action: Action) => action.payload)
        .switchMap((payload) => this.auth.login$(payload))
        .map(data => this.authActions.savelocalUser(data))
        .catch((err) => {
            return this._util.httpERRHandler(err)
        })

    /**
     * signup$
     *effect triggered when a user wants to signup
     */
    @Effect()
    signup$: Observable<Action> = this.action$
        .ofType(AUTH_SIGNUP)
        .map((action: Action) => action.payload)
        .switchMap((payload) => this.auth.signUp$(payload))
        .map((data) => this.authActions.authSuccess(data))
        .catch((err) => {
            return this._util.httpERRHandler(err)
        })

    /**
     *dashboard$
    * effect triggered when the user wants to retrive its personal info
     */
    @Effect()
    dashboard$: Observable<Action> = this.action$
        .ofType(AUTH_DETAILS)
        .map((action: Action) => action.payload)
        .switchMap((payload) => this.auth.getUser$(payload))
        .map((data: IUser) => this.authActions.savelocalUser({token: this.authDb.token,  user: data }))
        .catch((err) => this._util.httpERRHandler(err))

    /**
     *updateUser$
    * effect triggered when the user wants to update personal info
     */
    @Effect()
    updateUser$: Observable<Action> = this.action$
        .ofType(AUTH_UPDATE)
        .map((action: Action) => action.payload)
        .switchMap((payload) => this.auth.update$(payload.token, payload.user))
        .map((data) => this.authActions.savelocalUser(data))
        .catch((err) => {
            if (err.status !== 401) {
                return Observable.of(this.authActions.localUser())
            }
            return this._util.httpERRHandler(err)
        })

    /**
     *logout$
    * effect triggerd when the user wants to log out
     */
    @Effect()
    logout$: Observable<Action> = this.action$
        .ofType(AUTH_LOGOUT)
        .switchMap(() => this.auth.logOut$())
        .map((data) => this.authActions.authSuccess(data))
        .catch((err) => Observable.of(this.authActions.authFailure(err)))

    @Effect()
    logcalDetails$: Observable<Action> = this.action$
        .ofType(AUTH_LOCAL_DETAILS)
        .switchMap(() => this.authDb.getToken())
        .map( (token) => this.authActions.user(token))
        .catch((err) => Observable.of(this.authActions.authFailure({ err, test: 'test' })))

    @Effect()
    saveDetails$: Observable<Action> = this.action$
        .ofType(AUTH_SAVE_LOCAL_DETAILS)
        .map((action) => action.payload)
        .map((data: IUserDB) => {
            this.authDb.setAuth(data)
            return this.authActions.authSuccess(data || undefined)
        })
        .catch((err) => Observable.of(this.authActions.authFailure(err)))
}