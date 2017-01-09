import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// upload
import { NgSelectOption } from '@angular/forms'
import { FeedComponent, NavBarComponent, NavUnloginComponent, NavBarLoginComponent, FeedItemComponent } from './index'
import { FeedInfoComponent, AuthComponent, AuthLoginComponent, AuthSignUpComponent, UploadComponent, ItemCreateComponent } from './index'
import { InfoService } from './../../shared'

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

const comps = [
  UploadComponent,
  ItemCreateComponent,
  FeedComponent,
  NavBarComponent,
  NavUnloginComponent,
  NavBarLoginComponent,
  FeedItemComponent,
  FeedInfoComponent,
  AuthComponent,
  AuthLoginComponent,
  AuthSignUpComponent]

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  declarations: comps,
  exports: comps,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SubComponentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SubComponentModule,
        providers: [InfoService]
    };
  }
}
