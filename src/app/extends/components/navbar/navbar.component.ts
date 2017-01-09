import { Component, OnInit, Input } from '@angular/core';
import { NavUnloginComponent } from './../nav-unlogin/index'
import { Store } from '@ngrx/store'
import {AuthDB} from './../../../shared'
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'flux-navbar',
    templateUrl: 'navbar.component.html'
})
export class NavBarComponent implements OnInit {
    private user: Observable<any>
    private default: boolean = true
    private authDb: AuthDB = new AuthDB()
    constructor(private store: Store<any>) {
        this.user = this.store.select('user')
    }

    ngOnInit() {
        this.authDb.getToken()
            .subscribe(token => {
                this.default = (token === null)
            })
    }

}