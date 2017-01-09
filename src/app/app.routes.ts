import { Routes, RouterModule } from '@angular/router';
import {HomeComponent, PostFeedComponent, FeedListComponent, StreamComponent } from './pages'


export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'stream', component: StreamComponent },
    { path: 'feed', component: FeedListComponent },
    { path: 'feed/:id', component: FeedListComponent },
    { path: 'posts/:id', component: PostFeedComponent },
    { path: '**', component: HomeComponent },
];
