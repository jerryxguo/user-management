import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AlertService } from './service/alert.service';
import { AuthenticationService } from './service/authentication.service';
import { JwtInterceptorService } from './service/jwt-interceptor.service';
import { ErrorInterceptorService } from './service/error-interceptor.service';
import { UserService } from './service/user.service';
import { GuardService } from './service/guard.service';
import { ConfirmationDialogService } from './service/confirmation-dialog.service';

import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { AlertComponent } from './view/alert/alert.component';
import { RegisterComponent } from './view/register/register.component';
import { ConfirmationDialogComponent } from './view/shared/confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AlertComponent,
    RegisterComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    AlertService,
    AuthenticationService,
    GuardService,
    UserService,
    ConfirmationDialogService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },

  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
