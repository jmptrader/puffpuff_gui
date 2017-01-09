import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare const $;

@Component({
    selector: 'flux-auth-signup',
    templateUrl: 'signup.component.html'
})
export class AuthSignUpComponent implements OnInit {

    @Input('page-status') pageStatus: boolean
    @Output('change-page') changePage = new EventEmitter()
    @Output('signUp-Data') signUpEvent = new EventEmitter()
    private userData = {}
    private err = {
        show: false,
        mgs: ''
    }
    constructor() {}

    change() {        
        this.pageStatus = !this.pageStatus
        this.changePage.emit({ page: this.pageStatus })
    }

    signUp(data) {
        if (!data.gender || !data.email || !data.username || !data.password) {
            this.err.show = true
            this.err.mgs = 'invalid signUp data provided'
            return
        }
        this.err['show'] = false
        this.signUpEvent.emit(data)
    }

    setInput(name, event) {
        this.userData[name] = event.target.value
    }

    setGender(type) {
        this.userData['gender'] = type
    }

    ngOnInit() {
        $('.ui.dropdown').dropdown({on: 'click'});
     }

}