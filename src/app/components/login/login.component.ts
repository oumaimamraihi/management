import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private AuthService: AuthService
  ) {}

  ngOnInit() {}

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onLogin() {
    // invalid form
    if (!this.loginForm.valid) {
      return;
    }
    // else
    this.AuthService.login(this.loginForm.value).subscribe(
      (data) => {
        // redirect to the home page
        this.router.navigate(['']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
