import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule, MatListModule, MatIconModule, MatSidenavModule, MatButtonModule, MatToolbarModule, MatCardModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FilterPipe } from './filter.pipe';
import { UsersService } from './user-list/users.service';
import { TodoComponent } from './todo-list-app/todo.component';
import { TodoService } from './todo-list-app/shared/todo.service';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { UtilityComponent } from './utility/utility.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireDatabaseModule,
  LayoutModule,
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  FlexLayoutModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule
  ],
  declarations: [
    HomeComponent,
    SidenavComponent,
    UserFormComponent,
    UserListComponent,
    HomePageComponent,
    AboutUsComponent,
    GalleryComponent,
    FilterPipe,
    RegisteredUsersComponent,
    TodoComponent,
    UtilityComponent,
    PaginationComponent
  ],
  providers: [UsersService, TodoService],
  bootstrap: [HomeComponent]
})
export class DashboardModule { }
