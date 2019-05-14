import { TokenService } from './../services/token.service';
import { AuthJwtService } from "./../services/auth-jwt.service";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };

  public error = [];

  constructor(
    private authJwt: AuthJwtService,
    private Token: TokenService,
    private router: Router
    ) {}

    onSubmitSignup() {
    this.authJwt.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      );
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/login');
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  ngOnInit() {}
}
