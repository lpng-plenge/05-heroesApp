import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'heroes-layout-page',
    templateUrl: './layout-page.component.html',
    styles: ``,
    standalone: false
})
export class LayoutPageComponent {
  public sideBarItems = [
    {label: 'List', icon: 'label', url: './list'},
    {label: 'Add', icon: 'add', url: './new-hero'},
    {label: 'Search', icon: 'search', url: './search-page'}
  ]

  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  get user():User |undefined{
    return this.authService.currentUser;
  }
  onLogout():void{
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
