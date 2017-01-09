import { NgModule, ApplicationRef, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './shared'
import { AuthEffect, ItemEffect, UtilEffect } from './shared'
import { EffectsModule } from '@ngrx/effects'
import {
    AuthService, AuthActions, FeedService, ItemService, ItemAction, PrimusService,
    PostListActions, UploadService, FeedActions, FeedEffect, InfoService
} from './shared'
import { CoreService } from './core.service'
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { PostFeedComponent, FeedListComponent, StreamComponent, HomeComponent } from './pages'
// importing dumb components
import { SubComponentModule } from './extends/components';
import { NgSelectOption } from '@angular/forms'

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HomeComponent,
        PostFeedComponent,
        FeedListComponent,
        StreamComponent
    ],
    imports: [ // import Angular's modules
        BrowserModule,
        StoreModule.provideStore(reducer),
        EffectsModule.run(ItemEffect),
        EffectsModule.run(AuthEffect),
        EffectsModule.run(FeedEffect),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
        SubComponentModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, { useHash: true })
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
        AuthService,
        FeedService,
        AuthActions,
        ItemService,
        ItemAction,
        FeedActions,
        UploadService,
        PostListActions,
        InfoService,
        UtilEffect,
        PrimusService,
        CoreService
    ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) { }

}

