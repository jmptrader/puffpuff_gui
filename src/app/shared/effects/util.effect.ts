import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import { AuthActions } from './../actions/auth.action'
import { AuthService } from './../services/auth.service'
import {
    AUTH_LOGIN, AUTH_SIGNUP, AUTH_UPDATE,
    AUTH_DETAILS, AUTH_LOGOUT, AUTH_LOCAL_DETAILS
} from './../actions'
import { UserDB, AuthorizedId, AuthDB } from './../database'
import { IUserDB } from './../interfaces'

import { ERRHANDLER } from './../../shared.extend'

@Injectable()
export class UtilEffect {
    private authDB: AuthDB = new AuthDB()
    constructor(private auth: AuthService, private authActions: AuthActions, private action$: Actions) { }

    httpERRHandler(err): Observable<Action> {
        console.log('err', err)
        switch (err.status) {
            case 401:
                    ERRHANDLER.auth(err)  
                    this.authDB.delToken()
                    return Observable.of(this.authActions.authSuccess(undefined))
            default:
                return Observable.of(this.authActions.authFailure(err))
        }
    }
}