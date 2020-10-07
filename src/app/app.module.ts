import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeHomeComponent } from './employee/employee-home.component';
import { MatComponentsModule } from './mat-components/mat-components.module';
import { EmployeeModule } from './employee/employee.module';

@NgModule({
 imports: [
 BrowserAnimationsModule,
 BrowserModule,
 EmployeeModule,
 HttpClientModule,
 MatComponentsModule
 ],
 bootstrap: [EmployeeHomeComponent]
})
export class AppModule {}