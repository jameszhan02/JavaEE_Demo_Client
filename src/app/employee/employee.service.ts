import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASEURL } from '../constants';
import { Employee } from './employee';
import { Observable } from 'rxjs';
// @ts-ignore
@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    resourceURL: string;
    status: string;
    constructor(public http: HttpClient) {
        this.resourceURL = `${BASEURL}api/employees`;
    } // constructor
    /**
    * Retrieves the employees collection, parses the JSON, then returns the array to a subscriber
    */
    load(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.resourceURL);
    } // load

    /**
    * Update an employee on the server using http put, server returns updated employee
    */
    update(employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${this.resourceURL}`, employee);
    } // update

    /**
    * add an employee on the server using http post
    */
    add(employee: Employee): Observable<Employee> {
        employee.id = 0;//?
        return this.http.post<Employee>(this.resourceURL, employee);
    } // add

    /**
    * delete an employee on the server, using get for custom url not delete
    */
    delete(id): Observable<number> {
        return this.http.delete<number>(`${this.resourceURL}/${id}`);
    } // delete

}