import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseHomeComponent } from './expense-home.component';
import { ExpenseDetailComponent } from './expense-detail.component';

import { MatComponentsModule } from '../mat-components/mat-components.module';
import {  ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ExpenseHomeComponent, ExpenseDetailComponent],
  imports: [
    CommonModule,
    MatComponentsModule,
    ReactiveFormsModule
  ]
})
export class ExpenseModule { }




