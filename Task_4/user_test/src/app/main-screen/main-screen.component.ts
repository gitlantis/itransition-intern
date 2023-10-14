import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { Constants } from 'src/constants';
import { Router } from '@angular/router';
import { CacheHelper } from 'src/helpers/cache-helper';
import { UserPost } from 'src/helpers/auth/userpost.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})

export class MainScreenComponent implements OnInit {
  userName?: string;
  closeModal?: string;
  constants = new Constants()
  timeZoneOffset = new Date().getTimezoneOffset();
  utcDate = new Date('08/08/2019 13:07:48 PM UTC');
  users: Array<UserPost> = [];
  checked = false;
  tmpValues: string[] = [];
  sendingList: string[] = [];

  constructor(private authService: AuthService, private modalService: NgbModal,
    private userService: UserService, private router: Router, private toastr: ToastrService) { }

  datacount = 0;
  ngOnInit(): void {
    if (CacheHelper.getToken().length > 3) {
      this.userName = (CacheHelper.getUsername() as string);

      this.userService.getUsers().subscribe(
        res => {
          this.users = res;
          res.forEach((item, idx) => {
            this.tmpValues[idx] = item.userGuid;
          });
        }, err => this.router.navigateByUrl('/login'));
      this.sendingList = this.sendingList.filter(this.onlyUnique);
    } else this.router.navigateByUrl('/login');

  }

  checkValuesChange() {
    this.checked = !this.checked
    if (this.checked === false) this.sendingList = [];
    else {
      this.tmpValues.forEach(element => {
        this.sendingList.push(element)
      });
    }
    this.sendingList = this.sendingList.filter(this.onlyUnique);
  }

  checkedBox(value: string) {
    var idx = this.sendingList.indexOf(value)

    if (idx !== -1) {
      this.sendingList.splice(idx, 1);;
    } else {
      this.sendingList.push(value)
    }
    this.sendingList = this.sendingList.filter(this.onlyUnique);
  }

  onlyUnique(value: string, index: number, array: string[]) {
    return array.indexOf(value) === index;
  }

  logOut() {
    this.authService.logout();
  }

  blockAction() {
    this.userService.blockUsers(this.sendingList).subscribe(
      res => {
        this.toastr.success('Users blocked successfully', 'Success!');
        this.sendingList.forEach(element => {
          var userIndex = this.users.findIndex(c => {
            return c.userGuid === element;
          });
          this.users[userIndex].isBlocked = true;
        });
      },
      err => {
        this.toastr.error('An error accured during the processing a request', 'Data error!');
      });
  }

  unlockAction() {
    this.userService.unblockUsers(this.sendingList).subscribe(
      res => {
        this.toastr.success('Users unlocked successfully', 'Success!');
        this.sendingList.forEach(element => {
          var userIndex = this.users.findIndex(c => {
            return c.userGuid === element;
          });
          this.users[userIndex].isBlocked = false;
        });
      },
      err => {
        this.toastr.error('An error accured during the processing a request', 'Data error!');
      });
  }

  deleteAction() {
    this.userService.deleteUsers(this.sendingList).subscribe(
      res => {
        this.toastr.success('Users deleted successfully', 'Success!');

        this.sendingList.forEach(element => {
          var userIndex = this.users.findIndex(c => {
            return c.userGuid === element;
          });

          if (this.users[userIndex].username === this.userName)
            this.router.navigateByUrl('/login');
          this.users.splice(userIndex, 1);
        });
        this.sendingList = []
      },
      err => {
        this.toastr.error('An error accured during the processing a request', 'Data error!');
      });
  }
}