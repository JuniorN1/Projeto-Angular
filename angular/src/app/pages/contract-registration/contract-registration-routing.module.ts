import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractRegistrationComponent } from './contract-registration.component';

const routes: Routes = [
  { path: '', component: ContractRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRegistrationRoutingModule { }
