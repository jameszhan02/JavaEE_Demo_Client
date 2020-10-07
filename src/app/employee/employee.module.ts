import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeHomeComponent } from './employee-home.component';

import { MatComponentsModule } from '../mat-components/mat-components.module';
import { EmployeeDetailComponent } from './employee-detail.component';
import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployeeListComponent, EmployeeHomeComponent, EmployeeDetailComponent],
  imports: [
    CommonModule,
    // EmployeeHomeComponent,
    MatComponentsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
