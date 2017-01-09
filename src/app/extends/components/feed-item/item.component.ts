import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

import { ApiUrl } from  './../../../shared'

@Component({
    selector: 'flux-feed-item',
    templateUrl: 'item.component.html'
})
export class FeedItemComponent implements OnInit {

    @Input('Item') feedItem;
    private inputLabel = 'Comment'
    private singleUpload = false
    private upload = true

    private nToken: Observable<any>
    @Output('form-reply') replyModal = new EventEmitter()

    constructor() {

    }

    getReply() {
        if (!this.feedItem || !this.feedItem.type) return ''
        if (this.feedItem.type === '[post]') return this.feedItem.id
        if (!this.feedItem.base) return  ''
        return this.feedItem.base.id
    }

    getImg(feedItem) {
        if (!feedItem.imgsUrl || !feedItem.imgsUrl.imgs) return []
        let imgObject = feedItem.imgsUrl.imgs
        imgObject = imgObject.map((img) => ApiUrl + img.low)
        return imgObject
    }

    getType() {
        return this.feedItem.type === '[post]'
    }

    relay($event) {
        this.replyModal.emit($event)
    }

    ngOnInit() {}

}