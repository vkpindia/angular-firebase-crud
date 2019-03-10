import { Component, ElementRef, AfterViewInit, ViewChild, VERSION, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavService } from '../sidenav/nav.service';

// export interface NavItem {
//   displayName: string;
//   disabled?: boolean;
//   iconName: string;
//   routePath?: string;
//   children?: NavItem[];
// }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;
  navItems: any = [
    {
      displayName: 'Home',
      iconName: 'recent_actors',
      routePath: 'module/home'
    },
    {
      displayName: 'About Us',
      iconName: 'speaker_notes',
      routePath: 'module/about-us'
    },
    {
      displayName: 'Users',
      iconName: 'person',
      children: [
        {
          displayName: 'User List',
          iconName: 'star_rate',
          routePath: 'module/user-list'
        },
        {
          displayName: 'Registered Users',
          iconName: 'star_rate',
          routePath: 'module/registered-users'
        }
      ]
    },
    {
      displayName: 'Todo List',
      iconName: 'movie_filter',
      routePath: 'module/todo-list'
    },
    {
      displayName: 'Pagination',
      iconName: 'movie_filter',
      routePath: 'module/pagination'
    },
    {
      displayName: 'Formly Form',
      iconName: 'videocam',
      routePath: 'module/formly-form'
    },
    {
      displayName: 'Utility',
      iconName: 'feedback',
      children: [
        {
          displayName: 'Photo Gallery',
          iconName: 'star_rate',
          routePath: 'module/gallery'
        },
        {
          displayName: 'Utility',
          iconName: 'star_rate',
          routePath: 'module/utility'
        }
      ]
    }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

constructor(private breakpointObserver: BreakpointObserver, private navService: NavService) {}

ngOnInit() {}
ngAfterViewInit() {
 // this.navService.appDrawer = this.appDrawer;
}

signOut() {}
}
