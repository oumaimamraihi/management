import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericComponentRoutingModule } from './generic-component-routing.module';
import { GenericComponentComponent } from './generic-component.component';
import { MatTableModule } from '@angular/material/table';
import {  MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GenericComponentComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    GenericComponentRoutingModule
  ],

})
export class GenericComponentModule { }
