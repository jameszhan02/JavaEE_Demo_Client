import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { EmployeeHomeComponent } from './employee/employee-home.component';
import { MatComponentsModule } from './mat-components/mat-components.module';
import { EmployeeModule } from './employee/employee.module';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpenseModule } from './expense/expense.module';
import { ReportModule } from './report/report.module';
import { DeleteDialogComponent } from './deletedialog/delete-dialog.component';

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        EmployeeModule,
        HttpClientModule,
        MatComponentsModule,
        ExpenseModule,
        ReportModule
    ],
    bootstrap: [AppComponent],
    declarations: [AppComponent, HomeComponent]
})
export class AppModule { }