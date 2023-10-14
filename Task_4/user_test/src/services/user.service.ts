import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Constants } from 'src/constants';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/helpers/auth/user.model';
import { UserPost } from 'src/helpers/auth/userpost.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(httpClient: HttpClient, router: Router, constants: Constants, private toastr: ToastrService) {
    super(httpClient, router, constants)
  }

  register(formData: User) {
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var email = regexp.test(formData.email);
    var isAcceptable = true;
    if (!email) {
      var message = "";
      if (formData.email === "")
        message = 'Email is required';
      else message = "Please check email"
      this.toastr.error(message, 'Registration error!');
      isAcceptable = false;
    }

    if (formData.password !== formData.repassword) {
      this.toastr.error('Password is not similar', 'Registration error!');
      isAcceptable = false;
    }

    var postUser = new UserPost();
    postUser.firstName = formData.firstName;
    postUser.lastName = formData.lastName;
    postUser.email = formData.email;
    postUser.username = formData.username;
    postUser.password = formData.password;

    if (isAcceptable)
      return this.httpClient.post(this.constants.baseUrl + '/User/AddUser', postUser).subscribe(
        res => {
          if (res != null) {
            this.router.navigateByUrl('/main');
            return true;
          } else {
            this.toastr.error("An error occured during registration", 'Registration error!');
            return false;
          }
        },
        error => {
          this.toastr.error("An error occured during registration", 'Registration error!');
        });
    else return false;
  }

  getUsers(): Observable<Array<UserPost>> {
    return this.httpClient.get<Array<UserPost>>(this.constants.baseUrl + '/User/GetUsers')
  }

  blockUsers(users: Array<string>): Observable<Array<string>> {
    return this.httpClient.post<Array<string>>(this.constants.baseUrl + '/User/BlockUsers', users)
  }

  unblockUsers(users: Array<string>): Observable<Array<string>> {
    return this.httpClient.post<Array<string>>(this.constants.baseUrl + '/User/UnblockUsers', users)
  }

  deleteUsers(users: Array<string>): Observable<Array<string>> {
    return this.httpClient.post<Array<string>>(this.constants.baseUrl + '/User/DeleteUsers', users)
  }
}
