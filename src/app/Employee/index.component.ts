import {LiveAnnouncer} from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
import { TblEmployee } from '../Shared/Models/TblEmployee';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AddComponent } from './add.component';
import { EditComponent } from './edit.component';
import { DeleteComponent } from './delete.component';
import {SelectionModel} from '@angular/cdk/collections';
import { DeleteManyEmployeeComponent } from '../delete-many-employee/delete-many-employee.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})



export class IndexComponent implements OnInit,AfterViewInit  {


  showLoader:boolean = true;
  displayedColumns: string[] = [  'empId','empName', 'empEmail', 'empPhone' ,'empAddress','operation'];

  isLoading = true;
  @ViewChild(MatPaginator) paginator?: MatPaginator ;
  @ViewChild('sort') sort = new MatSort();



  datasource: any;
  tableLength=0;
  selection = new SelectionModel<TblEmployee>(true, []);
  numberOfRowsSelected:number[]=[];
  isSelectAll:boolean=false;

  constructor(private service:EmployeeService
    ,private _liveAnnouncer: LiveAnnouncer,
     private dialog: MatDialog) {    
     }
  ngOnInit(): void {
   
    this.GetAll();
    this.numberOfRowsSelected.length;
  }

  GetAll(){
    this.service.getAll().subscribe((res) => {
      this.datasource = new MatTableDataSource(res);
      this.tableLength = res.length;
      if (res.length < 1) {
        this.isLoading = false;
      }
      this.selection = new SelectionModel<TblEmployee>(true, []);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      this.datasource.disableClear = true;
      this.isLoading = false;
     
    },
   error =>{
    this.isLoading = false;
      console.log(error)
    }
  
  )
 
  }

  addEmployee(){
    this.dialog.open(AddComponent,{
      width:'300px',

    }).afterClosed().subscribe(a => {
      this.GetAll();

      
    })
  }

  editEmployee(id:number){
    this.dialog.open(EditComponent,{
      width:'300px',
      data:{
        id:id
      }

    }).afterClosed().subscribe(a => {
      this.GetAll();
      
    })
  
  }

  deleteManyEmployee(){
    if (this.numberOfRowsSelected.length > 0 || this.isSelectAll) {
      this.dialog.open(DeleteManyEmployeeComponent,{
        width:'300px',
        data:{
          numberOfRowsSelected:this.numberOfRowsSelected,
          isSelectAll:this.isSelectAll
  
        }
  
      }).afterClosed().subscribe(a => {
        this.GetAll();
       
      })
    
    }

     
  
  
    }
 
  deleteEmployee(id:number){
    this.dialog.open(DeleteComponent,{
      width:'300px',
      data:{
        id:id
      }

    }).afterClosed().subscribe(a => {
      this.GetAll();
     
     
    })
  }

 
    ngAfterViewInit() {
      this.datasource.paginator = this.paginator;
        
    this.sort.disableClear = true;
    this.datasource.sort = this.sort;
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.datasource.filter = filterValue.trim().toLowerCase();
    }

    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      }
      
       else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }


    isAllSelected() {
     
        const numSelected = this.selection.selected.length;
      const numRows = this.datasource.data.length;
      return numSelected === numRows;
      
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
      if (this.isAllSelected()) {
        this.isSelectAll = false;
        this.numberOfRowsSelected.splice(0);
        this.selection.clear();
        return;
      }
      this.isSelectAll = true;
  
      this.selection.select(...this.datasource.data);
    }
  
    /** The label for the checkbox on the passed row */


    checkboxLabel(row?: TblEmployee): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.empId + 1}`;
    }

    selectOne(event:any,row:any){
      let isExist = false;
      for (let index = 0; index < this.numberOfRowsSelected.length; index++) {
        if (this.numberOfRowsSelected[index] == row.empId) {
          isExist= true;
          break;

        }
      }
      if (!isExist) {
        this.numberOfRowsSelected.push(row.empId);
      }
      else{
       let i = this.numberOfRowsSelected.findIndex(a => a == row.empId);
       this.numberOfRowsSelected.splice(i,1);

      }
      
    return event ? this.selection.toggle(row) : null
    }

  }


  


