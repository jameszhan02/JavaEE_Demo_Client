import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASEURL } from '../constants';
import { Expense } from './expense';
import { GenericHttpService } from '../generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService extends GenericHttpService<Expense>{
  constructor(public http: HttpClient) {
    super(http, `${BASEURL}/expenses`)
  }// constructor
}
