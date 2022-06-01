import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { GenericComponentComponent } from './generic-component.component';

const routes: Routes = [
  {path:'',component:GenericComponentComponent}
];

@NgModule({
  imports: [ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    ],
  exports: [RouterModule,]
})
export class GenericComponentRoutingModule { }
