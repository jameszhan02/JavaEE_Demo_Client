import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Expense } from './expense';
import { Employee } from '../employee/employee';
import { EmployeeService } from '../employee/employee.service';
import { ExpenseService } from '../expense/expense.service';
import { Observable, of } from 'rxjs';
import { catchError, share } from 'rxjs/operators';
@Component({
  selector: 'app-expense',
  templateUrl: 'expense-home.component.html'
})
export class ExpenseHomeComponent implements OnInit {
  employees$: Observable<Employee[]>;
  expenses: Expense[];
  expenses$: Observable<Expense[]>;
  selectedExpense: Expense;
  hideEditForm: boolean;
  msg: string;
  todo: string;
  url: string;
  displayedColumns: string[] = ['id', 'dateincurred', 'employeeid'];
  dataSource: MatTableDataSource<Expense>;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private employeeService: EmployeeService, private expenseService: ExpenseService) {
    this.hideEditForm = true;
  } // constructor
  ngOnInit(): void {
    this.msg = 'loading employees from server...';
    this.msg = `Employee's loaded`;
    this.employees$ = this.employeeService.getAll().pipe(
      share(),
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
          this.msg = `Error: ${error.error.message}`;
        } else {
          this.msg = `Error: ${error.message}`;
        }
        return of([]);
      })
    );
    this.msg = `Expense's loaded`;
    this.expenses$ = this.expenseService.getAll().pipe(
      share(),
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
          this.msg = `Error: ${error.error.message}`;
        } else {
          this.msg = `Error: ${error.message}`;
        }
        return of([]);
      })
    );
    this.refreshDS();
  }
  select(expense: Expense): void {
    this.todo = 'update';
    this.selectedExpense = expense;
    this.msg = `Expense ${expense.id} selected`;
    this.hideEditForm = !this.hideEditForm;
  } // select
  /**
  * cancelled - event handler for cancel button
  */
  cancel(msg?: string): void {
    this.hideEditForm = !this.hideEditForm;
    this.refreshDS();
  } // cancel
  /**
  * update - send changed update to service update local array
  */
  update(expense: Expense): void {
    this.msg = 'Updating...';
    this.expenseService.update(expense).subscribe(payload => {
      if (payload.id > 0) {
        this.msg = `Expense ${expense.id} updated!`;
      } else {
        this.msg = 'Expense not updated! - server error';
      }
      this.refreshDS();
    },
      err => {
        this.msg = `Error - expense not updated - ${err.status} - ${err.statusText}`;
      });
    this.hideEditForm = !this.hideEditForm;
  } // update
  /**
  * save - determine whether we're doing and add or an update
  */
  save(expense: Expense): void {
    (expense.id) ? this.update(expense) : this.add(expense);
  } // save
  /**
  * add - send expense to service, receive newid back
  */
  add(expense: Expense): void {
    this.msg = 'Adding...';
    expense.id = 0;
    this.expenseService.add(expense).subscribe(payload => {
      if (payload.id > 0) {
        this.msg = `Expense ${payload.id} added!`;
      } else {
        this.msg = 'Expense not added! - server error';
      }
      this.refreshDS();
    },
      err => {
        this.msg = `Error - expense not added - ${err.status} - ${err.statusText}`;
      });
    this.hideEditForm = !this.hideEditForm;
  } // add
  /**
  * newExpense - create new expense instance
  */
  newExpense(): void {
    this.selectedExpense = {
      id: null, employeeid: null, categoryid: '',
      description: '', amount: null, dateincurred: null, receipt: false, receiptscan: null
    };
    this.msg = 'New expense';
    this.hideEditForm = !this.hideEditForm;
  } // newExpense
  /**
  * delete - send expense id to service for deletion
  */
  delete(expense: Expense): void {
    this.msg = 'Deleting...';
    this.expenseService.delete(expense.id)
      .subscribe(payload => {
        if (payload === 1) { // server returns # rows deleted
          this.msg = `Expense ${expense.id} deleted!`;
        } else {
          this.msg = 'Expense not deleted!';
        }
        this.refreshDS();
      },
        err => {
          this.msg = `Error - expense not deleted - ${err.status} - ${err.statusText}`;
        });
    this.hideEditForm = !this.hideEditForm;
  } // delete
  /**
  * refresh - update data table with any changes,
  * and reset sort directive
  */
  refreshDS(): void {
    this.expenses$.subscribe(expenses => {
      this.dataSource = new MatTableDataSource(expenses);
      this.dataSource.sort = this.sort;
    });
  } // refresh
} // ExpenseHomeComponent