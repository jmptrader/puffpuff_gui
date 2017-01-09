/**
 *  clap
 *      success
 *      error
 *  slap
 *      success
 *      error
 *  get Info
 *      success
 *      error
 */

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store'

import { IAction } from './../interfaces'

// export const INFO_SUCCESS = ''
export const INFO_CLAP = ''
export const INFO_SLAP = ''
export const INFO_FAILURE = ''
export const INFO_DETAILS = ''
export const INFO_UPDATE = ''

@Injectable()
export class InfoActions {

    constructor() { }


    // success(action: IAction): Action {
    //     return {
    //         type: INFO_SUCCESS,
    //         payload: action
    //     }
    // }


    /** 
     * failure()
     * returns a new action for the store to dispatch for the failure */
    failure(): Action {
        return {
            type: INFO_FAILURE
        }
    }

    /**
     *  update(action)
     *  takes an action and returns an ACTION for the
     *  store to dispatch
     */
    update(action: IAction): Action {
        return {
            type: INFO_UPDATE,
            payload: action
        }
    }

    /**
     *  details(data)
     *  returns the details
     */
    details(data: any): Action {
        return {
            type: INFO_DETAILS,
            payload: data
        }
    }



}