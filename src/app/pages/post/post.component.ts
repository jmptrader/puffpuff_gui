import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store'
import {
    FeedActions, ItemAction, PostListActions, InfoService, AuthDB,
    IUserDB, ApiUrl, ItemService, PrimusService, selectUser
} from './../../shared'
// import { Observable } from 'rxjs/observable'
import { Observable } from 'rxjs'
// import { merge } from 'rxjs/observable/merge'

import { CoreService } from './../../core.service'
import * as toastr from 'toastr'

toastr.options.newestOnTop = true;

declare const $;

import { isMobile } from './../../platform'

function getHtmlUrl() {
    if (isMobile()) return './mobile.home.component.html'
    return './web.home.component.html'
}

@Component({
    selector: 'flux-post-feed',
    templateUrl: 'post.component.html'
})
export class PostFeedComponent implements OnInit, AfterViewInit {
    private _id: string
    private inputLabel = ''

    private user: Observable<any>
    private posts: Observable<any>
    private item: Observable<any>

    private authDB: AuthDB = new AuthDB()

    private loaded = 'ui active dimmer'

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private store: Store<any>,
        private _postList: PostListActions,
        private _infosvc: InfoService,
        private _itemsvc: ItemService,
        private _item: ItemAction,
        private _coresvc: CoreService,
        private _primsvc: PrimusService
    ) {
        this.user = this.store.select('user')
        this.item = this.store.select('item')
        this.posts = this.store.select('postList')
    }


    createComment(id: string) {
        this.inputLabel = 'Comment'
    }

    loadComment(skip: number = 0) {
        return this._itemsvc.findItem$('comment', `${this._id}`, skip)  
            .map(data => data.data)

    }

    loadPost() {
        this._itemsvc.getItem$('post', this._id)
            .subscribe((data) => {
                if (data) this.store.dispatch(this._postList.addToPost(data))
                this.loaded = 'ui dimmer'
            })
    }

    dispatch() {
        this.posts
            .map(posts => posts.length)
            .switchMap((count) => this.loadComment(count))
            .subscribe((data) => this.store.dispatch(this._postList.addToPost(data)))
    }

    viewLoad() {
        this._infosvc.iView(this._id, this.authDB.auth().token)
    }

    ngAfterViewInit() {
        this._coresvc.loadMore.bind(this)('body', this.dispatch)
    }

    ngOnInit() {
        this.store.dispatch(this._postList.reset())
        this._route.params.subscribe((params: any) => {
            console.log('ngOnInit', params.id);
            this._id = params.id;
            this._primsvc.changeRoom({ room: this._id, id: selectUser('id') })
            this._primsvc.getRoomUsers(this._id)
            this.loadPost()
            // '#main_post'
            // this._coresvc.loadFeed('body', this.dispatch)
            this.viewLoad()

        });

        Observable.merge(this._primsvc.otherJoinedRoom(), this._primsvc.otherLeavedRoom())
            .subscribe((data) => toastr.warning(data.mgs))
        Observable.merge(this._primsvc.joinedRoom(), this._primsvc.leavedRoom())
            .subscribe((data) => toastr.success(data.mgs))

        this._primsvc.roomUsers().subscribe((data) => {
            if (data) toastr.info(`connected room users are ${data}`)
        })
        this._primsvc.postReply().subscribe((data) => {
            toastr.success(`${data.owner.username}: ${data.body}`)
            this.store.dispatch(this._postList.addToPost(data))
        })
    }

}