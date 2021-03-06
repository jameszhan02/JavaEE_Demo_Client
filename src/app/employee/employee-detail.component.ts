import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatePhone } from '../validators/phoneno.validator';

import { Employee } from './employee';
@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailComponent implements OnInit {
  @Input() selectedEmployee: Employee;
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();
  employeeForm: FormGroup;
  title: FormControl;
  firstname: FormControl;
  lastname: FormControl;
  phoneno: FormControl;
  email: FormControl;
  originalName: string;
  constructor(private builder: FormBuilder) {
    this.title = new FormControl('', Validators.compose([Validators.required]));
    this.firstname = new FormControl('', Validators.compose([Validators.required]));
    this.lastname = new FormControl('', Validators.compose([Validators.required]));
    this.phoneno = new FormControl('', Validators.compose([Validators.required, ValidatePhone]));
    this.email = new FormControl('', Validators.compose([Validators.required, Validators.email]));
  } // constructor
  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      title: this.title,
      firstname: this.firstname,
      lastname: this.lastname,
      phoneno: this.phoneno,
      email: this.email
    });
    // patchValue doesn’t care if all values present
    this.employeeForm.patchValue({
      title: this.selectedEmployee.title,
      firstname: this.selectedEmployee.firstname,
      lastname: this.selectedEmployee.lastname,
      phoneno: this.selectedEmployee.phoneno,
      email: this.selectedEmployee.email
    });
  } // ngOnInit
  updateSelectedEmployee(): void {
    this.selectedEmployee.title = this.employeeForm.value.title;
    this.selectedEmployee.firstname = this.employeeForm.value.firstname;
    this.selectedEmployee.lastname = this.employeeForm.value.lastname;
    this.selectedEmployee.phoneno = this.employeeForm.value.phoneno;
    this.selectedEmployee.email = this.employeeForm.value.email;
    this.saved.emit(this.selectedEmployee);
  }
} // EmployeeDetailComponent