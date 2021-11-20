import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginVm } from '@core/service-proxies/service-proxies';
import { AppConfigService } from '@core/_services/app-confiq/app-config.service';
import { AuthStore } from 'app/auth/auth.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  siteKey!: string;

  invalidLogin: boolean = false;
  isFormSubmitted: boolean = false;
  constructor(
    private _AuthStore: AuthStore,
    private _AppConfigService: AppConfigService,
    private router: Router,
    private fb: FormBuilder,) {
    this.siteKey = this._AppConfigService.config.recaptchaSiteKey;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      recaptcha: ['', [Validators.required]]
    })
  }

  submit() {
    this.isFormSubmitted = true;
    if (this.form.invalid) return;
    this._AuthStore.login(new LoginVm({
      username: this.form.value.username,
      password: this.form.value.password,
    })
    ).subscribe(
      res => {
        if (!res)
          this.invalidLogin = true;
        this.router.navigate(['zones']);
      },
      err => console.log(err)
    )
  }

  get userNameInput() {
    return this.form.get('username');
  }

  get passwordInput() {
    return this.form.get('password');
  }

  get recaptchaInput() {
    return this.form.get('recaptcha');
  }

}
