import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Component({
    selector: 'app-exercises',
    templateUrl: 'employee-home.component.html'
})
export class EmployeeHomeComponent implements OnInit {
    employees$: Observable<Employee[]>;
    employee: Employee;
    msg: string;
    hideEditForm: boolean;
    todo: string;
    constructor(public employeeService: EmployeeService) {
        this.hideEditForm = true;
    } // constructor
    ngOnInit(): void {
        this.msg = `Employee's loaded`;
        this.employees$ = this.employeeService.load().pipe(
            catchError(error => {
                if (error.error instanceof ErrorEvent) {
                    this.msg = `Error: ${error.error.message}`;
                } else {
                    this.msg = `Error: ${error.message}`;
                }
                return of([]);
            })
        );
    } // ngOnInit
    select(employee: Employee): void {
        this.todo = 'update';
        this.employee = employee;
        this.msg = `${employee.lastname} selected`;
        this.hideEditForm = !this.hideEditForm;
    } // select
    /**
    * cancelled - event handler for cancel button
    */
    cancel(msg?: string): void {
        if (msg) {
            this.msg = 'Operation cancelled';
        }
        this.hideEditForm = !this.hideEditForm;
    } // cancel
    /**
    * update - send changed update to service
    */
    update(employee: Employee): void {
        this.employeeService.update(employee).subscribe(payload => {
            if (payload.id > 0) {
                this.msg = `Employee ${employee.id} updated!`;
            } else {
                this.msg = 'Employee not updated! - server error';
            }
            this.hideEditForm = !this.hideEditForm;
        },
            err => {
                this.msg = `Error - employee not updated - ${err.status} - ${err.statusText}`;
            });
    } // update

    /**
    * save - determine whether we're doing and add or an update
    */
    save(employee: Employee): void {
        (employee.id) ? this.update(employee) : this.add(employee);
    } // save
    /**
  * add - send employee to service, receive new employee back
  */
    add(employee: Employee): void {
        employee.id = 0;
        this.employeeService.add(employee).subscribe(payload => {
            if (payload.id > 0) {
                this.msg = `Employee ${payload.id} added!`;
            } else {
                this.msg = 'Employee not added! - server error';
            }
            this.hideEditForm = !this.hideEditForm;
        },
            err => {
                this.msg = `Error - employee not added - ${err.status} - ${err.statusText}`;
            });
    } // add
    /**
    * delete - send employee id to service for deletion
    */
    delete(employee: Employee): void {
        this.employeeService.delete(employee.id)
            .subscribe(payload => {
                if (payload === 1) { // server returns # rows deleted
                    this.msg = `Employee ${employee.id} deleted!`;
                } else {
                    this.msg = 'Employee not deleted!';
                }
                this.hideEditForm = !this.hideEditForm;
            },
                err => {
                    this.msg = `Error - employee not deleted - ${err.status} - ${err.statusText}`;
                });
    } // delete
    /**
    * newEmployee - create new employee instance
    */
    newEmployee(): void {
        this.employee = { id: null, title: '', firstname: '', lastname: '', phoneno: '', email: '' };
        this.msg = 'Adding New employee';
        this.hideEditForm = !this.hideEditForm;
    } // newEmployee
} // EmployeeHomeComponent