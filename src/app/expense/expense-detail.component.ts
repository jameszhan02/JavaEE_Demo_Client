import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Expense } from './expense';
import { Employee } from '../employee/employee';
import { ValidateAmount } from '../validators/amount.validator';
@Component({
  selector: 'app-expense-detail',
  templateUrl: 'expense-detail.component.html'
})
export class ExpenseDetailComponent implements OnInit {
  // setter
  @Input() selectedExpense: Expense;
  @Input() employees: Employee[];
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();
  expenseForm: FormGroup;
  employeeid: FormControl;
  categoryid: FormControl;
  description: FormControl;
  amount: FormControl;
  receipt: FormControl;
  dateincurred: FormControl;
  constructor(private builder: FormBuilder) {
    this.employeeid = new FormControl('', Validators.compose([Validators.required]));
    this.categoryid = new FormControl('', Validators.compose([Validators.required]));
    this.description = new FormControl('', Validators.compose([Validators.required]));
    this.amount = new FormControl('', Validators.compose([Validators.required, ValidateAmount]));
    this.receipt = new FormControl('', Validators.compose([Validators.required]));
    this.dateincurred = new FormControl('', Validators.compose([Validators.required]));
  } // constructor
  ngOnInit(): void {
    console.log(this.employees);
    
    console.log(this.selectedExpense);
    this.expenseForm = this.builder.group({
      employeeid: this.employeeid,
      categoryid: this.categoryid,
      description: this.description,
      amount: this.amount,
      receipt: this.receipt,
      dateincurred: this.dateincurred
    });
    // patchValue doesn't care if all values are present
    this.expenseForm.patchValue({
      employeeid: this.selectedExpense.employeeid,
      categoryid: this.selectedExpense.categoryid,
      description: this.selectedExpense.description,
      amount: this.selectedExpense.amount,
      receipt: this.selectedExpense.receipt,
      dateincurred: this.selectedExpense.dateincurred
    });
  } // ngOnInit
  updateSelectedExpense(): void {
    this.selectedExpense.employeeid = this.expenseForm.get('employeeid').value;
    this.selectedExpense.categoryid = this.expenseForm.get('categoryid').value;
    this.selectedExpense.description = this.expenseForm.get('description').value;
    this.selectedExpense.amount = this.expenseForm.get('amount').value;
    this.selectedExpense.receipt = this.expenseForm.get('receipt').value;
    this.selectedExpense.dateincurred = this.expenseForm.get('dateincurred').value;
    this.saved.emit(this.selectedExpense);
  }
} // ExpenseDetailComponent
