import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationComponent } from './user-registration.component';
import { userRegistrationRoutes } from './user-registrarion.routing';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(userRegistrationRoutes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [UserRegistrationComponent]
})
export class UserRegistrationModule { }
