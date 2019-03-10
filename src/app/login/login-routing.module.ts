import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserloginComponent } from './userlogin/userlogin.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: UserloginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'module',
    loadChildren: '../dashboard/dashboard.module#DashboardModule'
  },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
