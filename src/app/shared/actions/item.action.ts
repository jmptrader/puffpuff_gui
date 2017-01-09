/** 
 * responsible for the post crud options on a post
 * create
 * update
 * get
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store'
import { IFeedItem } from './../interfaces'

export const ITEM_LOAD = '[ITEM]_LOAD'
export const ITEM_CREATE = '[ITEM]_CREATE'
export const ITEM_UPDATE = '[ITEM]_UPDATE'
export const ITEM_SUCCESS = '[ITEM]_SUCCESS'
export const ITEM_FAILURE = '[ITEM]_FAILURE'

@Injectable()
export class ItemAction {

    constructor() { }

    /**loadItem(type, id)
     * type can be of [post, comment]
     * returns an action to get the item */
    loadItem(type: string, id: string): Action {
        return {
            type: ITEM_LOAD,
            payload: { type, id }
        }
    }

    /**createItem(token,type, data)
     * type can be of [post, comment]
     * returns an action to create the item  from the data provided*/
    createItem(token: string, type: string, data: any): Action {
        return {
            type: ITEM_CREATE,
            payload: { token, type, data }
        }
    }

    /**updateItem(token, type, id, data)
     * type can be of [post, comment]
     * returns an action to up the item of the id  from the data provided*/
    updateItem(token: string, type: string, id: string, data: any): Action {
        return {
            type: ITEM_UPDATE,
            payload: { token, type, id, data }
        }
    }

    /** success(data)
     * returns an action with the recived data to the store */
    success(data: IFeedItem): Action {
        return {
            type: ITEM_SUCCESS,
            payload: data
        }
    }

    /** failure()
     * returns an action for a failed dispatched action */
    failure(): Action {
        return {
            type: ITEM_FAILURE
        }
    }

}