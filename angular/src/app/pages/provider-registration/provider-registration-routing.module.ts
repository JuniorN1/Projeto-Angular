import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderRegistrationComponent } from './provider-registration.component';

const routes: Routes = [
  { path: '', component: ProviderRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRegistrationRoutingModule { }
