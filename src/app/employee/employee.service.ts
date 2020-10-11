import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASEURL } from '../constants';
// import { Observable } from 'rxjs';
import { Employee } from './employee';
import { GenericHttpService } from '../generic-http.service';
// @ts-ignore
@Injectable({
    providedIn: 'root'
})
export class EmployeeService extends GenericHttpService<Employee>{
  constructor(public http: HttpClient){
      super(http, `${BASEURL}/employees`)
  }// constructor


}