import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  signInForm!: FormGroup;
  signUpForm!: FormGroup;
  passwordVisible = false;
  errorSignIn: string = '';
  errorSignUp: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signInForm = this.fb.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }

  onSubmitSignIn() {
    this.authService.logIn(this.signInForm.value).subscribe(
      (user) => {
        const tokenDecoded = jwtDecode(user.token) as { exp: number };
        if (Date.now() > tokenDecoded.exp * 1000) {
          localStorage.removeItem('token');
          this.errorSignIn = 'Token has expired';
          throw new Error('Token has expired');
        }
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', user.token);
        localStorage.setItem('email', user.email);
        localStorage.setItem('userId', user.id);

        this.router.navigate(['']);
      },
      (err) => (this.errorSignIn = err.error)
    );
  }

  onSubmitSignUp() {
    this.authService.signUp(this.signUpForm.value).subscribe(
      (user) => {
        const tokenDecoded = jwtDecode(user.token) as { exp: number };
        if (Date.now() > tokenDecoded.exp * 1000) {
          localStorage.removeItem('token');
          this.errorSignUp = 'Token has expired';
          throw new Error('Token has expired');
        }
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', user.token);
        localStorage.setItem('email', user.email);
        localStorage.setItem('userId', user.id);

        this.router.navigate(['']);
      },
      (err) => (this.errorSignUp = err.error)
    );
  }
}
