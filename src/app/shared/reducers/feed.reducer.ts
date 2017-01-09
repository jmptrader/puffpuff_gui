import { Action, ActionReducer } from '@ngrx/store'
import { IFeedItem } from './../interfaces'
import { FEED_LIST_RESET, FEED_SUCCESS, FEED_FAILURE } from './../actions'
import { addState } from './util.reducer'

export const FeedReducer: ActionReducer<IFeedItem[]> = (state: IFeedItem[] = [], action: Action) => {
    switch (action.type) {
        case FEED_LIST_RESET:
            return []
        case FEED_SUCCESS:
            return addState(action.payload, state)
        case FEED_FAILURE:
        default:
            return state
    }
}