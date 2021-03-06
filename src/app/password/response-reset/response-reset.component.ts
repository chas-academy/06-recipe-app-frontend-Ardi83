import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthJwtService } from 'src/app/services/auth-jwt.service';
import { SnotifyService } from 'ng-snotify';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss']
})
export class ResponseResetComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authJwt: AuthJwtService,
    private router: Router,
    private Notify:SnotifyService
    ) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token']
    });
  }

  public error = [];
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  }

  onSubmit() {
    this.authJwt.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }

  handleResponse(data) {
    let _router = this.router;
    this.Notify.confirm('Done!, Now login with new Password',{
      buttons: [
        {text: 'Okay',
      action: toster => {
        _router.navigateByUrl('/login'),
        this.Notify.remove(toster.id)
        }
      },
      ]
    })
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  ngOnInit() {
  }

}
