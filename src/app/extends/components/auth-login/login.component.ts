import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'flux-auth-login',
    templateUrl: 'login.component.html'
})
export class AuthLoginComponent implements OnInit {
    @Input('page-status') pageStatus: Boolean
    @Output('change-page') changePage = new EventEmitter()
    @Output('login-Data') loginEvent = new EventEmitter()
    private userData = {}
    private err = {
        show: false,
        mgs: ''
    }

    constructor() { }

    change() {
        this.pageStatus = !this.pageStatus
        this.changePage.emit({ page: this.pageStatus })
    }

    login(data) {
        if (!data.email || !data.password) {
            this.err.show = true
            this.err.mgs = 'invalid Login data provided'
            return
        }
        this.err['show'] = false
        this.loginEvent.emit(data)
    }

    setInput(name, event) {
        this.userData[name] = event.target.value
    }

    ngOnInit() { }

}