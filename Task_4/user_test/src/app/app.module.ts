import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { RegisterScreenComponent } from './register-screen/register-screen.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { Constants } from 'src/constants';
import { CommonModule, registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import en from '@angular/common/locales/en';
import { TokenInterceptor } from './token.interceptor';


registerLocaleData(en);
@NgModule({
    declarations: [
        AppComponent,
        LoginScreenComponent,
        RegisterScreenComponent,
        MainScreenComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        Constants
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
