import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'auth-login-page',
    templateUrl: './login-page.component.html',
    styles: ``,
    standalone: false
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  onLogin():void{
    this.authService.login('374222','1234').
    subscribe( user => {
      this.router.navigate(['/']);
    } )
  }
}
