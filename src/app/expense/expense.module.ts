import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseHomeComponent } from './expense-home.component';
import { ExpenseDetailComponent } from './expense-detail.component';
import { DeleteDialogComponent } from '../deletedialog/delete-dialog.component';


import { MatComponentsModule } from '../mat-components/mat-components.module';
import {  ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ExpenseHomeComponent, ExpenseDetailComponent, DeleteDialogComponent],
  entryComponents: [DeleteDialogComponent],
  imports: [
    CommonModule,
    MatComponentsModule,
    ReactiveFormsModule
  ]
})
export class ExpenseModule { }




