/**
 * responsible for feed actions to load more feed Data
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store'

import { IFeedItem } from './../interfaces'

export const POST_LIST_FAILURE = '[POST_LIST]_FAILURE'
export const POST_LIST_ADD = '[POST_LIST]_ADD'
export const POST_LIST_LOAD_POST = '[POST_LIST]_LOAD_POST'
export const POST_LIST_LOAD_COMMENT = '[POST_LIST]_LOAD_COMMENT'
export const POST_LIST_RESET = '[POST_LIST]_RESET'
export const POST_LIST_SAVE = '[POST_LIST]_SAVE'

@Injectable()
export class PostListActions {

    constructor() { }

    /**
     *  loadPost(id, skip)
     * dispatch an action to load a post of the particular id */
    loadPost(id: string, skip: number = 0): Action {
        return {
            type: POST_LIST_LOAD_POST,
            payload: { id, skip }
        }
    }

    /**
     *  loadComments(id)
     *  dispatch an action to load comment of a post to the store
     */
    loadComments(id: string): Action {
        return {
            type: POST_LIST_LOAD_COMMENT,
            payload: id
        }
    }

    /** addToPost(item)
     * returns a new action and payload is item*/
    addToPost(item: IFeedItem[]): Action {
        return {
            type: POST_LIST_ADD,
            payload: item
        }
    }

    /** saveAddPost(item)
    * returns a new action and payload is item and saves in the db*/
    saveAddPost(item: IFeedItem[]): Action {
        return {
            type: POST_LIST_SAVE,
            payload: item
        }
    }


    /** reset()
     * clears the post List*/
    reset(): Action {
        return {
            type: POST_LIST_RESET
        }
    }

    /**
     * feedFailure()
     * returns an action for the store to dispatch for the store */
    postFailure(): Action {
        return {
            type: POST_LIST_FAILURE
        }
    }

}