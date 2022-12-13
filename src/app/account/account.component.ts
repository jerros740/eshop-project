import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: User;
  canEdit: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.userService.logUser.username == 'Guest') {
      this.router.navigate(['./login'])
    } else {
      this.user = this.userService.logUser
    }

  }

  edit(): void {
    if (this.canEdit == true) {
      this.canEdit = false;
    } else {
      this.canEdit = true;
    }

  }

}
