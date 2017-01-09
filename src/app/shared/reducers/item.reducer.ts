import { Action, ActionReducer } from '@ngrx/store'
import { IFeedItem } from './../interfaces'
import { ITEM_SUCCESS, ITEM_FAILURE } from './../actions'

export const ItemReducer: ActionReducer<IFeedItem> = (state: IFeedItem, action: Action) => {
    // console.log(action);
    switch (action.type) {
        case ITEM_SUCCESS:
            return Object.assign({}, state, action.payload)
        case ITEM_FAILURE:
        default:
            return state
    }
}