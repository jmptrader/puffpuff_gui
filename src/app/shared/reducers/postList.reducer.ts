import {Action, ActionReducer} from '@ngrx/store'
import { POST_LIST_ADD, POST_LIST_FAILURE, POST_LIST_RESET,POST_LIST_SAVE } from './../actions'
import { IFeedItem } from './../interfaces'
import { PostsDB } from './../database'
import { addState } from './util.reducer'

export const PostListReducer: ActionReducer<IFeedItem[]> = (state: IFeedItem[] = [], action: Action) => {    
    switch (action.type) {
        case POST_LIST_SAVE:
            if (action.payload.length) {
                PostsDB.batchCreateUpdate(action.payload)
            } else {
                PostsDB.createPutDoc(action.payload)
            }
        case POST_LIST_ADD:
            return addState(action.payload, state)
        case POST_LIST_RESET:
            return []
        case POST_LIST_FAILURE:
        default:
            return state
    }
}