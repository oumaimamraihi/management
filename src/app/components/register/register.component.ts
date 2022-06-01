import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // hide password
  hide: boolean = true;
  //hide confirm password
  hide1: boolean = true;
  signinForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private user: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    let listRoles = ['client'];

    this.signinForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmpassword: ['', [Validators.required]],

      },
      {
        validator: this.MustMatch('password', 'confirmpassword'),
      }
    );
  }
  // Compare password and confirmpassword
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  // Register
  onSignin() {
    // form invalid
    if (!this.signinForm.valid) {
      return;
    }
    // send user informations
    this.user.createUser(this.signinForm.value).subscribe(
      (data) => {
        // if ok add role to this user and redirect to login page :
        // retrieve the email and the role in an object emailRoleName
        let emailRoleName = {
          email: this.signinForm.get('email').value,
          roleName: "client",
        };
        // Add the role to user
        this.roleService.addRoleToUser(emailRoleName).subscribe(
          (data) => {},
          (error) => console.log(error)
        );
        //redirect to login page
        this.router.navigate(['login']);
      },
      (error) => console.log(error)
    );
  }
}
