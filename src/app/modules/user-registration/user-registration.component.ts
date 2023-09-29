import { UserRegistrationService } from './user-registration.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CustomValidators from './user-resgistration-confirm-password.validator';
import { Observable, first, tap } from 'rxjs';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
})
export class UserRegistrationComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  errorList$: Observable<string[]> = new Observable<string[]>();

  constructor(
    private formBuilder: FormBuilder,
    private userRegistrationService: UserRegistrationService
  ) {}

  ngOnInit() {
    this.errorList$ = this.userRegistrationService.getErrors$;
    this.createForm();
  }

  sendUser(user: any) {
    this.userRegistrationService
      .insertUser(user)
      .pipe(
        first(),
        tap(() => {
          this.form.reset();
          Object.keys(this.form.controls).forEach((key) => {
            this.form.get(key)?.setErrors(null);
          });
        })
      )
      .subscribe();
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        confirmPassword: [null, [Validators.required]],
      },
      {
        validators: [CustomValidators.match('password', 'confirmPassword')],
        updateOn: 'blur',
      }
    );
  }
}
