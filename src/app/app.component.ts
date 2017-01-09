/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { AuthActions, ItemAction, Posts_Faker, PostListActions } from './shared'

declare const $;
/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './app.component.css'
    ],
    template: `
    <flux-navbar ></flux-navbar>
    <div  class="ui justified grid">
      <main>
      <router-outlet></router-outlet>
    </main>
    </div>
    <footer>

    </footer>
  `
})
export class AppComponent {
    angularclassLogo = 'assets/img/angularclass-avatar.png';
    name = 'Angular 2 Webpack Starter';
    url = 'https://twitter.com/AngularClass';

    private user: Observable<any>
    private item: Observable<any>
    private token: string
    constructor(private store: Store<any>, private _auth: AuthActions) {

    }

    ngOnInit() {
        this.store.dispatch(this._auth.localUser())
        this.store
            .select('user')
            .subscribe( (data) => console.log('store', data))
        $('.ui.sticky')
            .sticky();
    }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
