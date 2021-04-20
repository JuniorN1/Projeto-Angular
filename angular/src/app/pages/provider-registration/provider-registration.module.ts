import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from 'src/app/ng-zorro-antd.module';

import { ProviderRegistrationRoutingModule } from './provider-registration-routing.module';

import { ProviderRegistrationComponent } from './provider-registration.component';


@NgModule({
  imports: [ProviderRegistrationRoutingModule
    ,FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule],
  declarations: [ProviderRegistrationComponent],
  exports: [ProviderRegistrationComponent]
})
export class ProviderRegistrationModule { }
