import { Component, OnInit } from '@angular/core';
import { isMobile } from './../../../platform'
import { mobile } from './mobile.login.component'
import { web } from './web.login.component'
function getHtmlUrl() {
    if (isMobile()) return mobile
    return web
}

@Component({
    selector: 'flux-nav-login',
    template: getHtmlUrl()
})
export class NavBarLoginComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

}