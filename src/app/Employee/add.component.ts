import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder,Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { TblEmployee } from '../Shared/Models/TblEmployee';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  employeeForm:any;
  phonePattern:any;
  tblEmployee:TblEmployee = new TblEmployee();
  matcher:any;
  constructor(public dialogRef: MatDialogRef<AddComponent>,
    private formbulider: FormBuilder,
    private router:Router,
    private employeeService:EmployeeService
    ) { }

  ngOnInit(): void {

    this.phonePattern = "^[0-9]{8,15}$";
    this.employeeForm = this.formbulider.group({
      Name: ['', [Validators.required]],
      Phone: ['',[Validators.required,Validators.pattern(this.phonePattern)]],
      Email: ['', [Validators.required,Validators.email]],
      Address: ['', [Validators.required]],
    
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    this.tblEmployee.empName = this.employeeForm.get('Name').value.toString();
    this.tblEmployee.empEmail = this.employeeForm.get('Email').value.toString();
    this.tblEmployee.empAddress = this.employeeForm.get('Address').value.toString();
    this.tblEmployee.empPhone = this.employeeForm.get('Phone').value.toString();
    // console.log(this.tblEmployee)
    this.employeeService.addEmployee(this.tblEmployee).subscribe(a => {
      

    },error => console.log("ERROR"+error));

    window.location.reload();
    this.dialogRef.close();

  }

}
