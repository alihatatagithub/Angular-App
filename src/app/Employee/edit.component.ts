import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder,Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TblEmployee } from '../Shared/Models/TblEmployee';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  employeeForm:any;
  phonePattern:any;
  employeeId:number=0;
  employeeEdit:TblEmployee = new TblEmployee();
  tblEmployee:TblEmployee = new TblEmployee();
  matcher:any;
  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private formbulider: FormBuilder,
    private router:Router,
    private _router:ActivatedRoute,
    private employeeService:EmployeeService
    ) {

      this.employeeId = data.id;
      console.log("ID"+this.employeeId)
      this.phonePattern = "^[0-9]{8,15}$";
      this.employeeService.getEmployee(this.employeeId).subscribe((a :any)=> {
        this.employeeEdit.empName = a.empName;
        this.employeeEdit.empEmail = a.empEmail;
        this.employeeEdit.empAddress = a.empAddress;
        this.employeeEdit.empPhone = a.empPhone;

        this.employeeForm.setValue({
          Name:a.empName,
          Email:a.empEmail,
          Address:a.empAddress,
          Phone:a.empPhone
        })
        
        console.log(this.employeeEdit.empName)
      },error => {
        console.log(error);
      })
  


     }

  ngOnInit(): void {
    

    this.employeeForm = this.formbulider.group({
      Name: ['', [Validators.required]],
      Phone: ['',[Validators.required,Validators.pattern(this.phonePattern)]],
      Email: ['', [Validators.required,Validators.email]],
      Address: ['', [Validators.required]]
  });


}

onNoClick(): void {
  this.dialogRef.close();
}

onSubmit(){
  this.tblEmployee.empName = this.employeeForm.get('Name').value;
  this.tblEmployee.empEmail = this.employeeForm.get('Email').value;
  this.tblEmployee.empAddress = this.employeeForm.get('Address').value;
  this.tblEmployee.empPhone = this.employeeForm.get('Phone').value;
  this.tblEmployee.empId = this.employeeId;
  // console.log(this.tblEmployee)
  this.employeeService.editEmployee(this.employeeId,this.tblEmployee).subscribe(a => {
    
  

  },error => console.log("ERROR"+error)
  ,() => {
    this.dialogRef.close();
  }
  );


}



}
