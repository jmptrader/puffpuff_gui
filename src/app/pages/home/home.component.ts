import { Component } from '@angular/core';

import { AuthActions, ApiUrl, ItemAction, ILogin, ISignUp, FeedActions, PostListActions , AuthDB} from './../../shared'
import { Observable } from 'rxjs/observable'
import { Store, Action } from '@ngrx/store'
import { Router } from '@angular/router';

import { CoreService } from './../../core.service'
import { isMobile } from './../../platform'
import { mobile } from './mobile.home.component'
import { web } from './web.home.component'

let _kthis;

// resovles html manually since node require doesnt allow''
// using variables to store paths
function getHtmlUrl() {
    if (isMobile()) return mobile
    return web
}

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'home'
    selector: 'home',  // <home></home>
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: getHtmlUrl()
})

export class HomeComponent {
    // Set our default values
    private trends: Observable<any>
    private user: Observable<any>
    private mobileDefault: boolean = true
    private dashboard: boolean = false
    private inputLabel = 'reply'
    private upload: boolean = true
    private singleUpload: boolean = false
    private item: Observable<any>
    private authDB: AuthDB = new AuthDB()

    private loaded = 'ui active dimmer'


    // TypeScript public modifiers
    constructor(
        private store: Store<any>, private _item: ItemAction,
        private authAction: AuthActions, private _route: Router,
        private _feed: FeedActions, private _post: PostListActions,
        private _coreSvc: CoreService
    ) {
        this.trends = this.store.select('trend')
        this.user = this.store.select('user')
        this.item = this.store.select('item')
        _kthis = this
    }

    auth(action: Action) {
        if (action.type === 'login') {
            this.store.dispatch(this.authAction.authLogin(action.payload))
            return null
        }

        this.store.dispatch(this.authAction.authSignUp(action.payload))
    }


    createComment(id: string) {
        this.inputLabel = 'Comment'
    }

    changeRoute() {
        // this.authDB.getToken()
        //     .subscribe(token => {
        //         if (token !== null) {
        //             this._route.navigateByUrl('/feed')
        //         }
        //     })
        // this.user.subscribe((data) => {
        //     this.mobileDefault = (data === undefined)
        //     this.dashboard = (data !== undefined)
        //     if (data !== undefined && data !== {}) {
        //         this._route.navigateByUrl('/feed')
        //     }
        // })

        this.user
            .switchMap((data) => this.authDB.getToken())
            .subscribe(token => {
                console.log('changed routes')
                if (token !== null) {
                    this._route.navigateByUrl('/feed')
                }
            })
    }

    hideLoading() {
        this.trends.subscribe((data) => {
            if (data !== undefined && data.length > 0) {
                this.loaded = 'ui dimmer'
            }
        })
    }

    dispatch() {
        _kthis.trends.subscribe((data: any[]) => {
            _kthis.store.dispatch(_kthis._feed.loadTrend(data.length))
        })
    }

    ngOnInit() {
        this.changeRoute()
        this.hideLoading()
        this._coreSvc.loadFeed('#main_trend', this.dispatch)
    }

}
