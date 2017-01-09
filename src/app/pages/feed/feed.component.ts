import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ItemAction, FeedActions, IUserDB, ApiUrl, AuthDB } from './../../shared'
import { Observable } from 'rxjs/observable'
import { Store, Action } from '@ngrx/store'
import { Router } from '@angular/router';
import { CoreService } from './../../core.service'
declare const $;
declare const toastr;

let _kthis;

@Component({
    selector: 'flux-feed-list',
    templateUrl: 'feed.component.html'
})
export class FeedListComponent implements OnInit, AfterViewInit {
    private inputLabel = ''
    private postCreator = 'ID_Post_Modal_Creator'
    private user: Observable<any>
    private item: Observable<any>
    private feed: Observable<any>
    private upload: boolean = true
    private singleUpload: boolean = true
    private loaded = 'ui active dimmer'
    private isloaded = false
    private authDB: AuthDB = new AuthDB()

    constructor(
        private store: Store<any>,
        private _route: Router,
        private _item: ItemAction,
        private _feed: FeedActions,
        private _coresvc: CoreService
    ) {
        this.user = this.store.select('user')
        this.item = this.store.select('item')
        this.feed = this.store.select('feed')
        _kthis = this
    }


    createPost() {
        this.inputLabel = 'Post'
        this._coresvc.openModal(this.postCreator)
    }


    createComment(id: string) {
        this.inputLabel = 'Comment'
    }

    dispatch(token: string, skip: number = 0) {
        _kthis.authDB.getToken()
            .subscribe((data) => {
                _kthis.feed.subscribe((data) => {
                    _kthis.store.dispatch(_kthis._feed.loadFeed(_kthis.authDB.auth().token, true, data.length))
                })
            })
        // _kthis.feed.subscribe((data: any[]) => {
        //     _kthis.user.subscribe((user: IUserDB) => {
        //             _kthis.store.dispatch(_kthis._feed.loadFeed(_kthis.authDB.auth().token, true, data.length))
        //     })
        // })
        // _kthis.feed.subscribe((data: any[]) => {
        //     _kthis.user.subscribe((user: IUserDB) => {
        //         if (user !== undefined && user !== {} && user.token !== undefined) {
        //             console.log('data.length', data.length);
        //             _kthis.store.dispatch(_kthis._feed.loadFeed(user.token, true, data.length))
        //         }
        //         if (user === undefined) {
        //             _kthis._route.navigateByUrl('/home')
        //         }
        //     })
        // })
    }

    changeRoute() {
        this.authDB.getToken()
            .subscribe((token) => {
                if (token === null) {
                    this._route.navigateByUrl('/home')
                }
            })
    }

    ngAfterViewInit() {

    }

    ngOnInit() {
        this.changeRoute()
        this._coresvc.loadFeed('#main_feed', this.dispatch)
    }
}