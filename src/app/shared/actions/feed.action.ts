/**
 * responsible for feed actions to load more feed Data
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store'

import { IFeedItem } from './../interfaces'

// export const 
export const FEED_LOAD_FEED = '[FEED]_LOAD_FEED'
export const FEED_OTHER_FEED = '[FEED]_OTHER_FEED'
export const FEED_FAILURE = '[FEED]_FAILURE'
export const FEED_ADD = '[FEED]_ADD'
export const FEED_SUCCESS = '[FEED]_SUCCESS'
export const LOAD_TREND = '[LOAD]_TREND'
export const LOAD_STREAM = '[LOAD]_STREAM'
export const LOAD_ADD_TREND = '[LOAD]_ADD_TREND'
export const LOAD_FAIL_TREND = '[LOAD]_FAIL_TREND'
export const FEED_LIST_RESET = '[FEED]_LIST_RESET'
export const FEED_LOAD_LOCAL_FEED = '[FEED]_LOAD_LOCAL_FEED'
export const TREND_LOAD_LOCAL_FEED = '[TREND]_LOAD_LOCAL_FEED'
export const STREAM_LOAD_LOCAL_FEED = '[STREAM]_LOAD_LOCAL_FEED'
@Injectable()
export class FeedActions {

    constructor() { }

    /**
     *loadFeed(token, skip) is dipatch to load a personal feed
     */
    loadFeed(token: string, offline: boolean = false, skip: number = 0): Action {
        return {
            type: FEED_LOAD_FEED,
            payload: {
                skip,
                token,
                offline
            }
        }
    }

    /**
     * otherFeed(id, skip) is dispatch to load a  personal feed
     * */
    otherFeed(id: string, skip: number = 0): Action {
        return {
            type: FEED_OTHER_FEED,
            payload: { id, skip }
        }
    }

    /** addToFeed(item)
     * returns a new action and payload is item*/
    addToFeed(item: IFeedItem[]): Action {
        return {
            type: FEED_SUCCESS,
            payload: item
        }
    }

    /**
     * feedFailure()
     * returns an action for the store to dispatch for the store */
    feedFailure(): Action {
        return {
            type: FEED_FAILURE
        }
    }

    /**
     * loadTrend(skip = 0)
     * dispatches an action to load trending data*/
    loadTrend(skip: number = 0, offline: boolean = false): Action {
        return {
            type: LOAD_TREND,
            payload: { skip, offline }
        }
    }

    addTrend(data: any[]) {
        return {
            type: LOAD_ADD_TREND,
            payload: data
        }
    }

    trendFail() {
        return {
            type: LOAD_FAIL_TREND
        }
    }

    /**
     * loadTrend(skip = 0)
     * dispatches an action to load trending data*/
    loadStream(skip: number = 0, offline: boolean = false): Action {
        return {
            type: LOAD_STREAM,
            payload: { skip, offline }
        }
    }

    localFeed(): Action {
        return {
            type: FEED_LOAD_LOCAL_FEED
        }
    }

    localTrend(): Action {
        return {
            type: TREND_LOAD_LOCAL_FEED
        }
    }

    localStream(): Action {
        return {
            type: STREAM_LOAD_LOCAL_FEED
        }
    }

    /** reset()
 * clears the post List*/
    reset(): Action {
        return {
            type: FEED_LIST_RESET
        }
    }

}