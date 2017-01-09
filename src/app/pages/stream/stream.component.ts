import { Component, OnInit } from '@angular/core';

import { AuthActions, ItemAction, ILogin, ISignUp, FeedActions } from './../../shared'
import { Observable } from 'rxjs/observable'
import { Store, Action } from '@ngrx/store'
import { Router } from '@angular/router';

@Component({
    selector: 'flux-stream',
    templateUrl: 'stream.component.html'
})
export class StreamComponent implements OnInit {
    private posts: Observable<any>
    constructor(private store: Store<any>, private _feed: FeedActions) { 
        this.posts = this.store.select('postList')
    }

    ngOnInit() {
        this.store.dispatch(this._feed.reset())
        this.store.dispatch(this._feed.loadStream())
    }

}