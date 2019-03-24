import { TokenService } from './../services/token.service';
import { Component, OnInit } from "@angular/core";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean;


  constructor(
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService
  ) {}
  ngOnInit() {
    this.Auth.authstatus.subscribe( value => this.loggedIn = value);
  }


  logout(event: MouseEvent) {
    event.preventDefault();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
    this.Token.remove();
  }
}
