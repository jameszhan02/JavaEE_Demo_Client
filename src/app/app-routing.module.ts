

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeHomeComponent } from './employee/employee-home.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'employees', component: EmployeeHomeComponent },
  { path: '', component: HomeComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
