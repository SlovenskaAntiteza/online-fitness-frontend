import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { RssService } from '../fitness-news/rss.service';
import { error } from 'console';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { config } from '../../config/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  sidebarVisible: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  isSelected(routerLink: string): boolean {
    return this.router.isActive(routerLink, false);
  }

  getStarted() {
    if (
      typeof sessionStorage !== undefined ||
      sessionStorage.getItem(config.SESSION_KEY) ||
      sessionStorage.getItem(config.TOKEN)
    ) {
      sessionStorage.clear();
    }
    this.router.navigate(['login']);
  }

  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        routerLink: 'profile',
        visible: this.authService.isLoggedIn,
      },
      {
        label: 'Get started',
        icon: 'pi pi-fw pi-caret-right',
        visible: !this.authService.isLoggedIn,
        command: () => this.getStarted(),
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logOut(),
        visible: this.authService.isLoggedIn,
      },
      {
        label: 'News',
        icon: 'pi pi-fw pi-info-circle',
        items: [
          {
            label: 'Feeds',
            routerLink: 'fitness-news',
          },
          {
            label: 'Exercises',
            routerLink: 'exercises',
          },
        ],
      },
      {
        label: 'Fitness programs',
        icon: 'pi pi-fw pi-file',
        routerLink: 'fitness-programs',
      },
      {
        label: 'My programs',
        icon: 'pi pi-fw pi-folder-open',
        routerLink: 'my-programs',
        visible: this.authService.isLoggedIn,
      },
      {
        label: 'Chat',
        icon: 'pi pi-fw pi-comments',
        routerLink: 'chat',
        visible: this.authService.isLoggedIn,
      },
      {
        label: 'Subscriptions',
        routerLink: 'subscriptions',
        icon: 'pi pi-fw pi-angle-double-down',
        visible: this.authService.isLoggedIn,
      },
      {
        label: 'Activities',
        routerLink: 'analytic',
        icon: 'pi pi-fw pi-bell',
        visible: this.authService.isLoggedIn,
      },
    ];
  }
}
