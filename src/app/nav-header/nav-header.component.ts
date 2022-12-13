import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {
  searchValue: string;

  constructor(private userService: UserService,
    private router: Router) {
    this.searchValue = "";
  }

  ngOnInit(): void {
  }

  search(): void {
    this.router.navigate(['./result',this.searchValue]).then(() => {
      this.refresh()
    });
  }

  isUserLogin(): boolean {
    return this.userService.logUser.username != 'Guest';
  }

  isAdmin(): boolean {
    return this.userService.logUser.admin
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/home']).then(() => {
      this.refresh()
    });
  }

  refresh(): void {
    window.location.reload()
  }
}
