import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/constants';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  constructor(public httpClient: HttpClient, public router: Router, public constants: Constants) { }
}
