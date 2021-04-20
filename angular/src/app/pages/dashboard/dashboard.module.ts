import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { ChartsModule } from 'ng2-charts';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';


@NgModule({
  imports: [
    DashboardRoutingModule,
    FormsModule,
    ChartsModule,
    NzProgressModule,
    CommonModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashborardModule { }
