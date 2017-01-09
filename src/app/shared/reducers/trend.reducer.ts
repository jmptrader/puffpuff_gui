import { Action, ActionReducer } from '@ngrx/store'
import { IFeedItem } from './../interfaces'
import { LOAD_ADD_TREND, LOAD_FAIL_TREND  } from './../actions'
import { addState } from './util.reducer'

export const TrendReducer: ActionReducer<IFeedItem[]> = (state: IFeedItem[] = [], action: Action) => {
    switch (action.type) {
        case LOAD_ADD_TREND:
            return addState(action.payload, state)
        case LOAD_FAIL_TREND:
        default:
            return state
    }
}