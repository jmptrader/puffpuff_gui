import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'flux-feed',
    templateUrl: 'feed.component.html'
})
export class FeedComponent implements OnInit {
    @Input('post-list') posts: any = []
    @Output('item-reply') value = new EventEmitter()
    private nToken: Observable<any>

    constructor() { }

    relay($event) {
        this.value.emit($event)
    }

    ngOnInit() {}

}