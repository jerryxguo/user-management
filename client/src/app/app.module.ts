import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AlertService } from './service/alert.service';
import { AuthenticationService } from './service/authentication.service';
import { JwtInterceptorService } from './service/jwt-interceptor.service';
import { ErrorInterceptorService } from './service/error-interceptor.service';
import { UserService } from './service/user.service';
import { GuardService } from './service/guard.service';

import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { AlertComponent } from './view/alert/alert.component';
import { RegisterComponent } from './view/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AlertComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AlertService,
    AuthenticationService,
    GuardService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
