import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-delete-many-employee',
  templateUrl: './delete-many-employee.component.html',
  styleUrls: ['./delete-many-employee.component.css']
})
export class DeleteManyEmployeeComponent implements OnInit {

  numberOfRowsSelected:number[]=[];
  isSelectAll:boolean;
  constructor(public dialogRef: MatDialogRef<DeleteManyEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private employeeService:EmployeeService) { 


      this.numberOfRowsSelected = data.numberOfRowsSelected;
      this.isSelectAll = data.isSelectAll;
    }

  ngOnInit(): void {
  }


  deleteManyEmployees(){
    if (this.isSelectAll) {
      this.employeeService.deleteAllEmployee().subscribe(a => {
        console.log(a);
      },error => {
        console.log(error);
      }, () => {
        this.dialogRef.close();
      })
    }

    else{
      this.employeeService.deleteManyEmployees(this.numberOfRowsSelected).subscribe(a => {
       console.log(a);
  
      },error => {
        console.log(error)
      },() => {
        this.dialogRef.close();
      }
      )
    }



  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
