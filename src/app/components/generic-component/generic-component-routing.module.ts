import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenericComponentComponent } from './generic-component.component';

const routes: Routes = [
  {path:'',component:GenericComponentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericComponentRoutingModule { }
