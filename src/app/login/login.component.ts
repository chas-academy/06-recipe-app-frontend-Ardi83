import { Router } from '@angular/router';
import { TokenService } from './../services/token.service';
import { AuthJwtService } from "./../services/auth-jwt.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from '../services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null
  };

  public erro = null;

  constructor(
    private authJwt: AuthJwtService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
    ) {}

  onSubmit() {
    this.authJwt
      .login(this.form).subscribe(
        data => this.handleResponse(data),
       errorr => this.handleError(errorr)
       );
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  handleError(err) {
    this.erro = err.error.error;
  }

  ngOnInit() {}
}
