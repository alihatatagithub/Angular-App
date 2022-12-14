import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { IndexComponent } from './Employee/index.component';
import { EditComponent } from './Employee/edit.component';
import { AddComponent } from './Employee/add.component';
import { RouterModule,Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {  FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from './Employee/delete.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DeleteManyEmployeeComponent } from './delete-many-employee/delete-many-employee.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


const routes: Routes = [
  {path:'employee',component:IndexComponent},
  {path:'add',component:AddComponent},
  {path:'edit/:id',component:EditComponent},
  {path:'delete/:id',component:EditComponent},
  {path:'',component:IndexComponent},
 

];
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    EditComponent,
    AddComponent,
    DeleteComponent,
    DeleteManyEmployeeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
    


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
