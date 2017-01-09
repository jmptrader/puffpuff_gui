import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ILogin, ISignUp } from './../../../shared'

@Component({
    selector: 'flux-auth',
    templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnInit {
    private default: boolean = true;
    @Input('login-callback') login: Function
    @Input('signUp-callback') signUp: Function
    @Output('auth-action-payload') authActionEvent = new EventEmitter()
    constructor() { }

    changeDefault($event: any): void {
        this.default = !this.default
    }

    authAction(type,data) {
        this.authActionEvent.emit({
            type: type,
            payload: data
        })
    }

    ngOnInit() {

    }

}