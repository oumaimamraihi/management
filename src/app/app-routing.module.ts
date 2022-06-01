import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { RoleGuard } from './auth/guards/role.guard';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
  },
  {
    path: 'products/:Name',
    loadChildren: () =>
      import('./components/generic-component/generic-component.module').then(
        (m) => m.GenericComponentModule
      ),
    // canActivate: [AuthGuard, RoleGuard],
    // data: {
    //   role: ['Admin', 'Client'],
    // },
  },
  {
    path: 'users/:Name',
    loadChildren: () =>
      import('./components/generic-component/generic-component.module').then(
        (m) => m.GenericComponentModule
      ),
    // canActivate: [AuthGuard, RoleGuard],
    // data: {
    //   role: ['Admin', 'Client'],
    // },
  },
  {
    path: 'reservations/:Name',
    loadChildren: () =>
      import('./components/generic-component/generic-component.module').then(
        (m) => m.GenericComponentModule
      ),
    // canActivate: [AuthGuard, RoleGuard],
    // data: {
    //   role: ['Admin', 'Client'],
    // },
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
