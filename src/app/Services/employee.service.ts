import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TblEmployee } from '../Shared/Models/TblEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.BaseUrl;
  employeeEdit:TblEmployee = new TblEmployee();
  constructor(private http:HttpClient) { }

  getAll(): Observable<TblEmployee[]>{
   return this.http.get<TblEmployee[]>(this.baseUrl+'api/employees');

  }

  addEmployee(tblEmployee:TblEmployee){
    return this.http.post<TblEmployee[]>(this.baseUrl+'api/employees',tblEmployee);
  }
  deleteEmployee(id:number){
    return this.http.delete(this.baseUrl+'api/employees/'+id);
  }

  deleteManyEmployees(numberOfRowsSelected:number[]){
    return this.http.post(this.baseUrl+'api/employees/DeleteMany',numberOfRowsSelected);
  }

  deleteAllEmployee(){
    return this.http.delete(this.baseUrl+'api/employees/DeleteAll');
  }

  editEmployee(id:number,tblEmployee:TblEmployee){
    return this.http.put(this.baseUrl+'api/employees/'+id,tblEmployee);
  }

  getEmployee(id:number){
    return this.http.get(this.baseUrl+'api/employees/'+id);
  }
}
