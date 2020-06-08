import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LayoutComponent } from './layout/layout.component';
import { UserListComponent } from './user-list/user-list.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { GalleryComponent } from './gallery/gallery.component';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';
import { TodoComponent } from './todo-list-app/todo.component';
import { UtilityComponent } from './utility/utility.component';
import { PaginationComponent } from './pagination/pagination.component';

const routes: Routes = [
  {path: '', component: LayoutComponent,
  children: [
    {path: '', redirectTo: 'gallery', pathMatch: 'full'},
    {path: 'home', component: HomePageComponent},
    {path: 'about-us', component: AboutUsComponent},
    {path: 'gallery', component: GalleryComponent},
    {path: 'user-list', component: UserListComponent},
    {path: 'registered-users', component: RegisteredUsersComponent},
    {path: 'todo-list', component: TodoComponent},
    {path: 'pagination', component: PaginationComponent},
    {path: 'utility', component: UtilityComponent},
    {path: 'formly-form', loadChildren: '../validation/validation.module#ValidationModule'}
  ]},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
