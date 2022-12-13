import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Item } from '../shared/models/item';
import { StorageService } from '../shared/services/storage.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {

  savedItem: Item[]

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if (this.userService.logUser.username == 'Guest') {
      this.router.navigate(['./login'])
      this._snackBar.open('You are not logged in', undefined, {
        duration: 1500
      })
    } else {
      this.savedItem = this.storageService.getFavoritesItems(this.userService.logUser)
    }

  }

}
