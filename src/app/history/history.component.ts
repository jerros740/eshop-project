import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Item } from '../shared/models/item';
import { StorageService } from '../shared/services/storage.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryComponent implements OnInit {

  itemsPurchase: Item[] = []
  itemsSold: Item[] = []
  itemsUser: Item[] = []

  itemsAccepted: Item[] = []
  itemsDeclined: Item[] = []

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.userService.logUser.username == 'Guest') {
      this.router.navigate(['./login'])
      this._snackBar.open('You are not logged in', undefined, {
        duration: 1500
      })
    } else {
      if (this.userService.logUser.admin) {
        this.itemsAccepted = this.storageService.getAcceptedItems();
        this.itemsDeclined = this.storageService.getDeclinedItems();

      } else {
        this.itemsPurchase = this.storageService.getPurchaseItems(this.userService.logUser);
        this.itemsSold = this.storageService.getSoldItem(this.userService.logUser);
        this.itemsUser = this.storageService.getAddedItems(this.userService.logUser);
      }

    }
  }

  isAdmin(): boolean {
    return this.userService.logUser.admin
  }
}
