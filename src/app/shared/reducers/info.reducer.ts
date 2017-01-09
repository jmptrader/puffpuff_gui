import {Action, ActionReducer} from '@ngrx/store'
import { IInfo } from './../interfaces'
import { INFO_DETAILS, INFO_FAILURE, INFO_UPDATE } from './../actions'

export const InfoReducer: ActionReducer<IInfo> = (state: IInfo , action: Action) => {
    switch (action.type) {
        case INFO_UPDATE:
        case INFO_DETAILS:
        case INFO_FAILURE:
                return state    
        default:
            return state
    }
}