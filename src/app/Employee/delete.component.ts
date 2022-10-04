import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder,Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TblEmployee } from '../Shared/Models/TblEmployee';
import { EmployeeService } from '../Services/employee.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

 
  employeeForm:any;
  phonePattern:any;
  employeeId:number=0;
  employeeEdit:TblEmployee = new TblEmployee();
  tblEmployee:TblEmployee = new TblEmployee();
  matcher:any;
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private formbulider: FormBuilder,
    private router:Router,
    private _router:ActivatedRoute,
    private employeeService:EmployeeService
    ) {

      this.employeeId = data.id;
     
     }

  ngOnInit(): void {
  }

  deleteEmployee(){
    this.employeeService.deleteEmployee(this.employeeId).subscribe(a => {
      console.log('Success');
      // window.location.reload();

    },error => {
      console.log(error)
    }, () => {
      this.dialogRef.close();
    })


  }
  onNoClick(): void {
    this.dialogRef.close();
  }

 
}
