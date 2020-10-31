

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeHomeComponent } from './employee/employee-home.component';
import { ExpenseHomeComponent } from './expense/expense-home.component';
import { ReportGeneratorComponent } from './report/report-generator.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'employees', component: EmployeeHomeComponent },
  { path: '', component: HomeComponent },
  { path: 'expenses', component: ExpenseHomeComponent }, 
  { path: 'generator', component: ReportGeneratorComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
