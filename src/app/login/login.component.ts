import { Router } from '@angular/router';
import { TokenService } from './../services/token.service';
import { AuthJwtService } from "./../services/auth-jwt.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from '../services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null
  };

  public error = null;
  public user = [];

  constructor(
    private authJwt: AuthJwtService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
    ) {}
    
    onSubmitLogin() {
      this.authJwt.login(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
        );
      }
      
      
      handleResponse(data) {
        this.Token.handle(data.access_token);
        this.Auth.changeAuthStatus(true);
        this.router.navigateByUrl('');
      }
      
      handleError(error) {
        this.error = error.error.error;
      }
      
      ngOnInit() {
      }
    }
    