import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { InfoService } from './../../../shared'
import { Observable } from 'rxjs/observable'
import { Store, Action } from '@ngrx/store'
import { Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';
declare const $;

const CLAP = 'like'
const SLAP = 'dislike'
const TIME_DELAY = 1000
const TIME_DEBOUNCE = 400

@Component({
    selector: 'flux-feed-info',
    templateUrl: 'info.component.html'
})
export class FeedInfoComponent implements OnInit {
    @Input('feed-id') id = ''
    @Input('feed-base') routeTo
    @Input('showRoute') allowRoute = false
    private item: Observable<any>
    private likes: Observable<any>
    private dislikes: Observable<any>
    private views: Observable<any>

    private user: Observable<any>
    private clapId = 'feed_clap_' + this.id
    private slapId = 'feed_slap_' + this.id
    @Output('comment') comment = new EventEmitter()

    constructor(private infosvc: InfoService, private store: Store<any>, private _route: Router) {
        this.user = this.store.select('user')

    }

    clap() {
        this.item = this.user.map((data) => data.token)
            .switchMap((token) => this.infosvc.iAction(token, CLAP, this.id))
            .switchMap((data) => this.initStat())
        this.initDatas()
    }

    slap() {
        this.item = this.user.map((data) => data.token)
            .switchMap((token) => this.infosvc.iAction(token, SLAP, this.id))
            .switchMap((data) => this.initStat())
        this.initDatas()
    }

    initStat() {
        return this.user
            .map((data) => {
                if (data === undefined || data.token === undefined) return undefined
                return data.token
            }).switchMap((data: any) => this.infosvc.getInfo(this.id, data))
    }

    initDatas() {
        this.likes = this.item
            .delay(TIME_DELAY)
            .debounceTime(TIME_DEBOUNCE)
            .map((data) => data.likes)
        this.dislikes = this.item
            .delay(TIME_DELAY)
            .debounceTime(TIME_DEBOUNCE)
            .map((data) => data.dislikes)
        this.views = this.item
            .delay(TIME_DELAY)
            .debounceTime(TIME_DEBOUNCE)
            .map((data) => data.views)
    }

    openModal() {
        $(`#${this.id}`)
            .modal('show');
    }

    route() {
        this._route.navigateByUrl(`/posts/${this.routeTo}`)
    }

    ngOnInit() {
        this.item = this.initStat()
        this.initDatas()
    }

}