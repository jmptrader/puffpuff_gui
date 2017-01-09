// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// TODO(gdi2290): switch to DLLs

// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

// AngularClass
import '@angularclass/hmr';

// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

// Ngrx
import '@ngrx/store'
import '@ngrx/store-devtools'
import '@ngrx/effects'

// Libs
// import 'jquery'
import 'pouchdb'
import 'toastr'
import 'dropzone'

// global jquery
require('script!jquery')
// require('script!semantic-ui/dist/components/')
// semantic ui
// importing app styles !style!css!
require('!style!css!dropzone/dist/min/dropzone.min.css')
require('!style!css!toastr/build/toastr.min.css')
require('!style!css!semantic-ui/dist/components/sticky.min.css')
require('script!semantic-ui/dist/components/sticky.min.js')
require('!style!css!semantic-ui/dist/components/segment.min.css')
require('!style!css!semantic-ui/dist/components/search.min.css')
require('script!semantic-ui/dist/components/search.min.js')
require('!style!css!semantic-ui/dist/components/modal.min.css')
require('script!semantic-ui/dist/components/modal.min.js')
require('!style!css!semantic-ui/dist/components/menu.min.css')
require('!style!css!semantic-ui/dist/components/loader.min.css')
require('!style!css!semantic-ui/dist/components/list.min.css')
require('!style!css!semantic-ui/dist/components/label.min.css')
require('!style!css!semantic-ui/dist/components/input.min.css')
require('!style!css!semantic-ui/dist/components/item.min.css')
require('!style!css!semantic-ui/dist/components/input.min.css')
require('!style!css!semantic-ui/dist/components/image.min.css')
// require('!style!css!semantic-ui/dist/components/icon.min.css') use icons loader
require('!style!css!semantic-ui/dist/components/grid.min.css')
require('!style!css!semantic-ui/dist/components/form.min.css')
require('script!semantic-ui/dist/components/form.min.js')
require('!style!css!semantic-ui/dist/components/feed.min.css')
require('!style!css!semantic-ui/dist/components/dropdown.min.css')
require('script!semantic-ui/dist/components/dropdown.min.js')
require('!style!css!semantic-ui/dist/components/container.min.css')
require('!style!css!semantic-ui/dist/components/comment.min.css')
require('!style!css!semantic-ui/dist/components/button.min.css')
require('!style!css!semantic-ui/dist/components/dimmer.min.css')
require('script!semantic-ui/dist/components/dimmer.min.js')
require('!style!css!semantic-ui/dist/components/transition.min.css')
require('script!semantic-ui/dist/components/transition.min.js')
require('!style!css!semantic-ui/dist/components/progress.min.css')
require('script!semantic-ui/dist/components/progress.min.js')
require('script!semantic-ui/dist/components/visibility.min.js')

if ('production' === ENV) {
  // Production


} else {
  // Development

}
