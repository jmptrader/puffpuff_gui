import { Component, OnInit } from '@angular/core';
import { isMobile , platform} from './../../../platform'
import { web } from './web.unlogin.component'
import { mobile } from './mobile.unlogin.component'

function getHtml() {
    if (isMobile()) return mobile
    return web
}

@Component({
    selector: 'flux-nav-unlogin',
    template: getHtml()
})
export class NavUnloginComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

}