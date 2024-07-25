import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginRequestInterface } from '../../../shared/models/loginRequest.model';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  formValue!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService:LoginService
    ) {
      this.createForm();
    }

    createForm() {
      this.formValue = this.formBuilder.group({
        username:['',Validators.required],
        password:['',Validators.required],
        expiresInMins:[30],
      });
    }
    login() {
      const request = this.formValue.getRawValue();
      this.loginService.login(request).subscribe(
        data => {
          if (data) {
            localStorage.setItem('token', data.token);
            this.router.navigate(['/merchant-list']);
          } else {
          }
        },
        error => {
        }
      );
    }

}
