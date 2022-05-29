import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericComponentRoutingModule } from './generic-component-routing.module';
import { GenericComponentComponent } from './generic-component.component';


@NgModule({
  declarations: [
    GenericComponentComponent,
  ],
  imports: [
    CommonModule,
    GenericComponentRoutingModule
  ]
})
export class GenericComponentModule { }
