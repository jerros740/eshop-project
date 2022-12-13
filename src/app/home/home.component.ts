import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/models/item';
import { StorageService } from '../shared/services/storage.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Item[] = []

  constructor(private storageService: StorageService,
    private userService: UserService) { }

  ngOnInit(): void {
    if (this.userService.logUser.admin) {
      this.items = this.getAdminItems()
    } else {
      const items: Item[] = this.storageService.getItems()
      for(let i = 0; i < items.length; i++) {
        if(items[i].hasBeenBought == false && items[i].status == 'accepted' && items[i].username !== this.userService.logUser.username && items[i].hidden == false) {
          this.items.push(items[i])
        }
      }
    }
  }

  getAdminItems(): Item[] {
    const items: Item[] = this.storageService.getItems()
    let filteredItems: Item[] = []
    for (let i = 0; i < items.length; i++) {
      let item: Item = items[i];

      if (item.status == 'wait') {
        filteredItems.push(item)
      }
    }

    return filteredItems;
  }

  isAdmin(): boolean {
    return this.userService.logUser.admin;
  }
}
