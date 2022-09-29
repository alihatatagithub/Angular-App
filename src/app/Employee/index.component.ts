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

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})



export class IndexComponent implements OnInit,AfterViewInit  {


  displayedColumns: string[] = [ 'empId' , 'empName', 'empEmail', 'empPhone' ,'empAddress','operation'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  dataSource:any;
  selection = new SelectionModel<TblEmployee>(true, []);

  constructor(private service:EmployeeService
    ,private _liveAnnouncer: LiveAnnouncer,
     private dialog: MatDialog) { }
  ngOnInit(): void {
    this.service.getAll().subscribe((ELEMENT_DATA:TblEmployee[])=>{
      this.dataSource = new MatTableDataSource<TblEmployee>(ELEMENT_DATA);
      this.selection = new SelectionModel<TblEmployee>(true, []);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);

        })
  }


  addEmployee(){
    this.dialog.open(AddComponent,{
      width:'300px',

    })
  }

  editEmployee(id:number){
    this.dialog.open(EditComponent,{
      width:'300px',
      data:{
        id:id
      }

    })
  
  }
 
  deleteEmployee(id:number){
    this.dialog.open(DeleteComponent,{
      width:'300px',
      data:{
        id:id
      }

    })
  }

    ngAfterViewInit() {



    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }


    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
  
      this.selection.select(...this.dataSource.data);
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: TblEmployee): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.empId + 1}`;
    }


  }

  


