export * from './auth.reducer'
export * from './feed.reducer'
export * from './info.reducer'
export * from './postList.reducer'
export * from './item.reducer'
export * from './trend.reducer'
export * from './util.reducer'
import { combineReducers, ActionReducer } from '@ngrx/store'
import { compose } from '@ngrx/core/compose';

import { IAuth, IFeedItem, IInfo } from './../index'

import { AuthReducer } from './auth.reducer'
import { FeedReducer } from './feed.reducer'
import { InfoReducer } from './info.reducer'
import { PostListReducer } from './postList.reducer'
import { ItemReducer } from './item.reducer'
import { TrendReducer } from './trend.reducer'

export interface State {
    user: IAuth,
    feed: IFeedItem[],
    postList: IFeedItem[],
    item: IFeedItem,
    info: IInfo,
    trend: IFeedItem[]
}

const reducers = {
    user: AuthReducer,
    feed: FeedReducer,
    postList: PostListReducer,
    item: ItemReducer,
    info: InfoReducer,
    trend:TrendReducer
}

export const developmentReducer: ActionReducer<State> = combineReducers(reducers)

export function reducer(state: any, action: any) {
    return developmentReducer(state, action)
}