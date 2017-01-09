import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/observable'

import { FeedActions, ItemAction, PostListActions, InfoService, IUserDB, ApiUrl, ItemService, AuthDB } from './shared'

declare const $

@Injectable()
export class CoreService {
    private user: Observable<any>
    private authDb: AuthDB = new AuthDB()
    constructor(
        private store: Store<any>,
        private _postList: PostListActions,
        private _infosvc: InfoService,
        private _itemsvc: ItemService,
        private _item: ItemAction
    ) {
        this.user = this.store.select('user')
    }

    openModal(id) {
        $(`#${id}`)
            .modal('show', 'hide others');
    }

    create($event) {
        // console.log('$event', $event)
        const type = $event.type.toLowerCase()
        let body = $event.input
        let token = this.authDb.auth().token

        if ($event.upload) {
            $event.dropzone.options.url = `${ApiUrl}/api/v1/${$event.type}s?token=${token}`
            $event.dropzone.on('successmultiple', (fileArray, res) => {
                this.store.dispatch(this._item.success(res))
                this.closeModal()
            })
            return $event.dropzone.processQueue()
        } else {
            if ($event.type.toLowerCase() === 'comment') {
                body = {
                    base: $event.base,
                    body
                }
            }
            this.store.dispatch(this._item.createItem(token, type, { body }))
            this.closeModal()
        }
    }

    closeModal() {
        $('.ui.modal')
            .modal('hide', 'hide all');
    }

    loadFeed(hookSelector: string, callback: any) {
        $(() => {
            $(hookSelector)
                .visibility({
                    once: false,
                    continuous: true,
                    // update size when new content loads
                    observeChanges: true,
                    // load content on bottom edge visible
                    onBottomVisible: function (cal) {
                        callback()
                    },
                    onPassing: function (cal) {
                        if (cal.percentagePassed > 0.73 && cal.percentagePassed < 0.78) callback()
                    },
                })
        })
    }

    loadMore(hookSelector: string, callback) {
        $(hookSelector)
            .visibility({
                once: false,
                continuous: true,
                // update size when new content loads
                observeChanges: true,
                // load content on bottom edge visible
                onBottomVisible: function (cal) {
                    callback.bind(this)()
                }.bind(this),
                onPassing: function (cal) {
                    if (cal.percentagePassed > 0.73 && cal.percentagePassed < 0.78) callback.bind(this)()
                },
            })
    }
}