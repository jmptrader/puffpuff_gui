import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TrendsDB, StreamDB, FeedDB } from './../database'

import { FeedService } from './../services'
import {
    FeedActions, FEED_ADD, FEED_FAILURE, FEED_LOAD_FEED,
    FEED_OTHER_FEED, PostListActions, LOAD_TREND, LOAD_STREAM,
    TREND_LOAD_LOCAL_FEED, FEED_LOAD_LOCAL_FEED, STREAM_LOAD_LOCAL_FEED
} from './../actions'
import { Observable } from 'rxjs/Observable'
import { UtilEffect } from './util.effect'
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import { ERRHANDLER } from './../../shared.extend'


@Injectable()
export class FeedEffect {

    constructor(private _actions$: Actions, private feedsvc: FeedService,
        private _feed: FeedActions, private _postList: PostListActions, private _util: UtilEffect) { }

    /**
     *personalFeed$
    * activated while loading user personal feed
     *  */
    @Effect()
    personalFeed$: Observable<Action> = this._actions$
        .ofType(FEED_LOAD_FEED)
        .map((action: Action) => action.payload)
        .switchMap((payload) => this.feedsvc.loadFeed$(payload.token, payload.skip))
        .map((data) => data.data)
        .map((data) => {
            console.log(data)
            FeedDB.checkAndAdd(data)
            return this._feed.addToFeed(data)
        })
        .catch((err) => {
            if (err.status === 401) {
                return this._util.httpERRHandler(err)
            }
            ERRHANDLER.load(err)
            return Observable.of(this._feed.feedFailure())
        })

    /** otherUserFeed$
     *triggered while loading other users feed
     */
    @Effect()
    otherUserFeed$: Observable<Action> = this._actions$
        .ofType(FEED_OTHER_FEED)
        .map((action: Action) => action.payload)
        .switchMap((payload) => this.feedsvc.userFeed$(payload.id, payload.skip))
        .map((data) => data.data)
        .map((data) => this._postList.addToPost(data))
        .catch((err) => {
            if (err.status === 401) {
                return this._util.httpERRHandler(err)
            }
            ERRHANDLER.load(err)
            return Observable.of(this._postList.postFailure())
        })

    /**
     *trend$
    * triggered while loading the item trends
     */
    @Effect()
    trend$: Observable<Action> = this._actions$
        .ofType(LOAD_TREND)
        .map((action: Action) => action.payload)
        .switchMap((payload) => {
            if (payload.offline === true) return this.feedsvc.trendingDB$().map((data) => data.rows)
            return this.feedsvc.trending$(payload.skip).map((data) => data.data)
        })
        .map((data) => {
            TrendsDB.batchCreateUpdate(data)
            return this._feed.addTrend(data)
        })
        .catch((err) => {
            if (err.status === 401) {
                return this._util.httpERRHandler(err)
            }
            ERRHANDLER.load(err)
            return Observable.of(this._feed.trendFail())
        })

    /**
     *stream$
     * triggered while loading the latest things of the feed.
     */
    @Effect()
    stream$: Observable<Action> = this._actions$
        .ofType(LOAD_STREAM)
        .map((action: Action) => action.payload)
        .switchMap((payload) => {
            if (payload.offline === true) return this.feedsvc.streamDB$().map((data) => data.rows)
            return this.feedsvc.stream$(payload.skip).map((data) => data.data)
        })
        .map((data) => {
            StreamDB.batchCreateUpdate(data)
            return this._postList.addToPost(data)
        })
        .catch((err) => {
            if (err.status === 401) {
                return this._util.httpERRHandler(err)
            }
            ERRHANDLER.load(err)
            return Observable.of(this._postList.postFailure())
        })

    /**triggers to loading already save streams */
    @Effect()
    feedDb$: Observable<Action> = this._actions$
        .ofType(FEED_LOAD_LOCAL_FEED)
        .switchMap(() => this.feedsvc.feedDB$())
        .map((data) => data.rows)
        .map((data) => this._feed.addToFeed(data))
        .catch((err) => {
            ERRHANDLER.load(err)
            return Observable.of(this._feed.feedFailure())})
}