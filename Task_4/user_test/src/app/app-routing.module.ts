import { NgModule } from '@angular/core';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterScreenComponent } from './register-screen/register-screen.component';

const routes: Routes = [
  { path: 'login', component: LoginScreenComponent },
  { path: 'register', component: RegisterScreenComponent },
  { path: '**', component: MainScreenComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
