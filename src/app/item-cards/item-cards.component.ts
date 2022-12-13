
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Item } from '../shared/models/item';
import { StorageService } from '../shared/services/storage.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-item-cards',
  templateUrl: './item-cards.component.html',
  styleUrls: ['./item-cards.component.css']
})
export class ItemCardsComponent implements OnInit {
  @Input() items: Item[] = []
  checkedItems: Item[] = []

  display: boolean = false;
  selectedItem: Item = new Item()
  lowValue: number = 0;
  highValue: number = 8;

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if (this.items.length > 0) {
      this.sortByDate()
    }
  }

  checkboxSelect(item: Item, event: any): void {
    if (event.target.checked === true) {
      this.checkedItems.push(item)
    }
    if (event.target.checked === false) {
      this.checkedItems = this.checkedItems.filter((i) => i.id !== item.id);
    }

  }

  showDialog(item: Item) {
    this.display = true;
    this.selectedItem = item
  }

  displayImage(item: Item) {
    if (!item.base64Image) {
      item.base64Image = 'assets/web-icon.png';
    }
  }

  sortByDate(): void {
    this.items.sort((a, b) => (a.date > b.date) ? 1 : -1);
  }

  saved(item: Item): void {
    let index: number | undefined = this.userService.logUser?.favorites.findIndex((i) =>
      i === item.id
    )

    if (index === undefined) {
      index = -1
    }

    if (index == -1) {
      this.userService.logUser?.favorites.push(item.id)
    } else {
      this.userService.logUser?.favorites.splice(index, 1)
    }

    this.userService.update()
  }

  saveColorItem(item: Item): string {
    let index: number | undefined = this.userService.logUser?.favorites.findIndex((i) =>
      i === item.id
    )

    if (index === undefined) {
      index = -1
    }

    if (index == -1) {
      return 'fillColor';
    } else {
      return 'red';
    }
  }

  buy(item: Item): void {
    if (this.userService.logUser.username == 'Guest') {
      this.router.navigate(['./login'])
      this._snackBar.open('You are not logged in', undefined, {
        duration: 1500
      })
    } else {
      item.boughtBy = this.userService.logUser.username;
      item.hasBeenBought = true;
      item.boughtOn = new Date().toUTCString();
      this.storageService.updateItem(item);
      this.display = false;
      window.location.reload()
    }
  }

  isAdmin(): boolean {
    return this.userService.logUser.admin;
  }

  decline(item: Item) {
    item.status = 'declined';
    this.storageService.updateItem(item);
    this.display = false;
  }

  accept(item: Item) {
    item.status = 'accepted';
    this.storageService.updateItem(item);
    this.display = false;
  }

  declineSelected(): void {
    for(let i=0; i< this.checkedItems.length; i++) {
      this.decline(this.checkedItems[i]);
    }
  }

  acceptSelected(): void {
    for(let i=0; i< this.checkedItems.length; i++) {
      this.accept(this.checkedItems[i]);
    }
  }

  reload(): void {
    window.location.reload();
  }
}
