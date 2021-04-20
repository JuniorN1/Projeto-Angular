import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { CommonModule } from "@angular/common";
import { ContractRegistrationRoutingModule } from './contract-registration-routing.module';

import { ContractRegistrationComponent } from './contract-registration.component';


@NgModule({
  imports: [ContractRegistrationRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule],
  declarations: [ContractRegistrationComponent],
  exports: [ContractRegistrationComponent]
})
export class ContractRegistrationModule { }
