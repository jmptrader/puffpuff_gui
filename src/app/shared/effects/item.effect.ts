import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { ItemAction } from './../actions/item.action'
import {ItemService } from './../services/item.service'
import { ITEM_CREATE, ITEM_LOAD, ITEM_UPDATE, PostListActions, POST_LIST_LOAD_POST } from './../actions'
import { Observable } from 'rxjs/Observable'

import { UtilEffect } from './util.effect'
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ItemEffect {
    constructor(private _actions$: Actions, private itemsvc: ItemService, private _item: ItemAction, private _postList: PostListActions, private _util: UtilEffect) { }

    /**createItem$
     * effect triggers when there is a post or item creation */
    @Effect()
    createItem$: Observable<Action> = this._actions$
        .ofType(ITEM_CREATE)
        .map((action: Action) => {
            return action.payload
        })
        .switchMap((payload: any) => {
            return this.itemsvc.createItem$(payload.token, payload.type, payload.data)
        })
        .map((data) => this._item.success(data))
        .catch((err) => {
            if (err.status === 401) {
                return this._util.httpERRHandler(err)
            }
            return Observable.of(this._item.failure())
        })

    /** updateItem$
     *  triggers when an item want to be updated
    */
    @Effect()
    updateItem$: Observable<Action> = this._actions$
        .ofType(ITEM_UPDATE)
        .map((action: Action) => action.payload)
        .switchMap((payload: any) => this.itemsvc.updateItem$(payload.token, payload.type, payload.data.id, payload.data))
        .map((data: any) => this._item.success(data))
        .catch((err) => {
            if (err.status === 401) {
                return this._util.httpERRHandler(err)
            }
            return Observable.of(this._item.failure())
        })

    /**
     * getItem$
     * triggers an effect to get a particular item from the server
     */
    @Effect()
    getItem$: Observable<Action> = this._actions$
        .ofType(ITEM_LOAD)
        .map((action: Action) => action.payload)
        .switchMap((payload) => this.itemsvc.getItem$(payload.type, payload.id))
        .map((data) => this._item.success(data))
        .catch((err) => {
            if (err.status === 401) {
                return this._util.httpERRHandler(err)
            }
            return Observable.of(this._item.failure())
        })

    /**
     *  loadPosts$
     *  triggers to load post and comments
     */
    //TODO apply offline checks for  data by performing offline checks and querys
    @Effect()
    loadPost$: Observable<Action> = this._actions$
        .ofType(POST_LIST_LOAD_POST)
        .map((action: Action) => action.payload)
        .switchMap((payload) => this.itemsvc.loadPostFeed$(payload.id, payload.skip))
        .map((data) => this._postList.saveAddPost(data))
        .catch((err) => {
            if (err.status === 401) {
                return this._util.httpERRHandler(err)
            }
            return Observable.of(this._item.failure())
        })
}