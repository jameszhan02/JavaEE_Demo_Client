import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee } from '../employee/employee';
import { Expense } from '../expense/expense';
import { ReportItem } from './report-item';
import { Report } from './report';
import { BASEURL, PDFURL } from '../constants';
import { EmployeeService } from '../employee/employee.service';
import { ExpenseService } from '../expense/expense.service';
import { ReportService } from './report.service';
@Component({
  templateUrl: './report-generator.component.html'
})
export class ReportGeneratorComponent implements OnInit, OnDestroy {
  // form
  generatorForm: FormGroup;
  employeeid: FormControl;
  expenseid: FormControl;
  subscription: Subscription;
  expenses$: Observable<Expense[]>; // everybody's expenses
  employees$: Observable<Employee[]>; // all employees
  employeeexpenses$: Observable<Expense[]>; // all expenses for a particular employee
  items: Array<ReportItem>; // expense items that will be in report
  selectedexpenses: Expense[]; // expenses that being displayed currently in app
  selectedExpense: Expense; // the current selected expense
  selectedEmployee: Employee; // the current selected employee
  pickedExpense: boolean;
  pickedEmployee: boolean;
  generated: boolean;
  hasExpenses: boolean;
  msg: string;
  total: number;
  url: string;
  reportno: number;
  constructor(private builder: FormBuilder,
    private employeeService: EmployeeService,
    private expenseService: ExpenseService,
    private reportService: ReportService) {
    this.pickedEmployee = false;
    this.pickedExpense = false;
    this.generated = false;
    this.url = BASEURL + 'reports';
  } // constructor
  ngOnInit(): void {
    this.msg = '';
    this.employeeid = new FormControl('');
    this.expenseid = new FormControl('');
    this.generatorForm = this.builder.group({
      expenseid: this.expenseid,
      employeeid: this.employeeid
    });
    this.onPickEmployee();
    this.onPickExpense();
    this.msg = 'loading employees and expenses from server...';
    this.employees$ = this.employeeService.getAll().pipe(
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
          this.msg = `Error: ${error.error.message}`;
        } else {
          this.msg = `Error: ${error.message}`;
        }
        return of([]); // returns an empty array if there's a problem
      })
    );
    this.expenses$ = this.expenseService.getAll().pipe(
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
          this.msg = `Error: ${error.error.message}`;
        } else {
          this.msg = `Error: ${error.message}`;
        }
        return of([]);
      })
    );
    this.msg = 'server data loaded';
  } // ngOnInit
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  } // ngOnDestroy
  /**
  * onPickEmployee - Another way to use Observables, subscribe to the select change event
  * then load specific employee expenses for subsequent selection
  */
  onPickEmployee(): void {
    this.subscription = this.generatorForm.get('employeeid').valueChanges.subscribe(val => {
      this.selectedExpense = null;
      this.selectedEmployee = val;
      this.loadEmployeeExpenses();
      this.pickedExpense = false;
      this.hasExpenses = false;
      this.msg = 'choose expense for employee';
      this.pickedEmployee = true;
      this.generated = false;
      this.items = []; // array for the report
      this.selectedexpenses = []; // array for the details in app html
    });
  } // onPickEmployee
  /**
  * onPickExpense - subscribe to the select change event then
  * update array containing items.
  */
  onPickExpense(): void {
    const xSubscr = this.generatorForm.get('expenseid').valueChanges.subscribe(val => {
      this.selectedExpense = val;
      const item: ReportItem = { id: 0, reportid: 0, expenseid: this.selectedExpense.id };
      if (this.items.find(it => it.expenseid === this.selectedExpense.id)) { // ignore entry
      } else { // add entry
        this.items.push(item);
        this.selectedexpenses.push(this.selectedExpense);
      }
      if (this.items.length > 0) {
        this.hasExpenses = true;
      }
      this.total = 0.0;
      this.selectedexpenses.forEach(exp => this.total += exp.amount);
    });
    this.subscription.add(xSubscr); // add it as a child, so all can be destroyed together
  } // onPickExpense
  /**
  * loadEmployeeExpenses - filter for a particular employee's expenses
  */
  loadEmployeeExpenses(): void {
    this.employeeexpenses$ = this.expenses$.pipe(
      map(expenses =>
        // map each expense in the array and check whether or not it belongs to selected employee
        expenses.filter(expense => expense.employeeid === this.selectedEmployee.id)
      )
    );
  } // loadEmployeeExpenses


  viewPdf(): void {
    window.open(PDFURL + this.reportno, '');
  } // viewPdf
  /**
  * createReport - create the client side report
  */
  createReport(): void {
    this.generated = false;
    const report: Report = { id: 0, items: this.items, employeeid: this.selectedExpense.employeeid };
    const rSubscr = this.reportService.add(report).subscribe(
      payload => { // server should be returning new id
        typeof payload === 'number'
          ? this.msg = `Report ${payload} added!`
          : this.msg = 'Report not added! - server error';
        this.hasExpenses = false;
        this.pickedEmployee = false;
        this.pickedExpense = false;
        if (typeof payload === 'number') {
          this.msg = `Report ${payload} added!`;
          this.reportno = payload;
          this.generated = true;
          } else {
          this.msg = 'Report not added! - server error';
          }
         
      },
      err => {
        this.msg = `Error - expense not added - ${err.status} - ${err.statusText}`;
      });
    this.subscription.add(rSubscr); // add it as a child, so all can be destroyed together
  } // createReport
} // ReportGeneratorComponent

