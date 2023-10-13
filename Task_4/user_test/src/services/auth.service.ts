import { Injectable } from '@angular/core';
import { User } from '../helpers/auth/user.model';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/constants';
import { BaseService } from './base.service';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';
import { UserPost } from 'src/helpers/auth/userpost.model';
import { CacheHelper } from 'src/helpers/cache-helper';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  formData: User = new User();

  constructor(httpClient: HttpClient, router: Router, constants: Constants, private toastr: ToastrService) {
    super(httpClient, router, constants)
  }

  login(formData: any) {
    return this.httpClient.post(this.constants.baseUrl + '/User/Login', formData).subscribe(
      res => {
        if (res != null) {
          var result = res as any;
          CacheHelper.setUsername(result['username']);
          CacheHelper.setToken(result['token'])
          this.router.navigateByUrl('/main');
          return true;
        } else {
          this.toastr.error("Check username and password again", 'Auth error!');
          return false;
        }
      }, err => {
        this.toastr.error("Cannot login", 'Auth error!');
      });
  }

  logout() {
    CacheHelper.removeToken();
    this.router.navigateByUrl('/login');
  }
}
