import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashborardModule) },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashborardModule) },
  { path: 'contract-registration', loadChildren: () => import('./pages/contract-registration/contract-registration.module').then(m => m.ContractRegistrationModule) },
  { path: 'provider-registration', loadChildren: () => import('./pages/provider-registration/provider-registration.module').then(m => m.ProviderRegistrationModule) },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
