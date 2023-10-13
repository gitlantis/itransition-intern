import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { CacheHelper } from 'src/helpers/cache-helper';

@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: [
    './register-screen.component.css'
  ]
})
export class RegisterScreenComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    var res = this.userService.register(form.value)
  }

}
