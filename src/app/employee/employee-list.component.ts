import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from './employee';
@Component({
    selector: 'app-employee-list',
    template:
        `
 <mat-list-item *ngFor="let employee of employees" (click)="selected.emit(employee)">
 {{ employee.id }} - {{ employee.firstname}}, {{employee.lastname}}
 </mat-list-item>
 `
})
//@output not mean moudle return an output
//output with new eventemitter is more like an empty method took the place first, is an output type. the acturlly founcation imp from employee-home
export class EmployeeListComponent {
    @Input() employees: Employee[];
    @Output() selected = new EventEmitter();
} // EmployeeListComponent
