import { SpaceValidators } from '../common/validators/space.validators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
form = new FormGroup({
  username: new FormControl('',[
    Validators.required,
    Validators.minLength(3),
    SpaceValidators.cannotContainSpace
  ]),
  password: new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    SpaceValidators.cannotContainSpace
  ]),
});

get username() {
  return this.form.get('username');
}
get password() {
  return this.form.get('password');  
}
}
  