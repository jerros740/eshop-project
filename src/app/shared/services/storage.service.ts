import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  getBoughtItems(): Item[] {
    const itemsJson = localStorage.getItem('items');

    if (itemsJson == null || itemsJson == '{}') {
      return []
    } else {
      const items: Item[] = JSON.parse(itemsJson);
      let boughtItems: Item[] = []
      for (let i = 0; i < items.length; i++) {
        if (items[i].hasBeenBought) {
          boughtItems.push(items[i])
        }
      }

      return boughtItems;
    }
  }

  getItemsWithKeyword(word: string, user: User) {
    const itemsJson = localStorage.getItem('items');

    if (itemsJson == null || itemsJson == '{}') {
      return []
    } else {
      const items: Item[] = JSON.parse(itemsJson);
      let resItems: Item[] = []
      for (let i = 0; i < items.length; i++) {
        if (items[i].title.toLowerCase().includes(word.toLowerCase()) && items[i].hasBeenBought == false && items[i].status == 'accepted' && items[i].username != user.username) {
          resItems.push(items[i])
        }
      }

      return resItems;
    }
  }

  getDeclinedItems(): Item[] {
    const itemsJson = localStorage.getItem('items');

    if (itemsJson == null || itemsJson == '{}') {
      return []
    } else {
      const items: Item[] = JSON.parse(itemsJson);
      let declinedItems: Item[] = []
      for (let i = 0; i < items.length; i++) {
        if (items[i].status == 'declined') {
          declinedItems.push(items[i])
        }
      }

      return declinedItems;
    }
  }

  getAcceptedItems(): Item[] {
    const itemsJson = localStorage.getItem('items');

    if (itemsJson == null || itemsJson == '{}') {
      return []
    } else {
      const items: Item[] = JSON.parse(itemsJson);
      let acceptedItems: Item[] = []
      for (let i = 0; i < items.length; i++) {
        if (items[i].status == 'accepted') {
          acceptedItems.push(items[i])
        }
      }

      return acceptedItems;
    }
  }

  getAddedItems(user: User): Item[] {
    const items: Item[] = this.getItems();
    let addedItems: Item[] = []

    for (let i = 0; i < items.length; i++) {
      if (items[i].username == user.username) {
        addedItems.push(items[i])
      }
    }

    return addedItems;
  }

  getPurchaseItems(user: User): Item[] {

    const items: Item[] = this.getItems();
    let purchaseItems: Item[] = []

    for (let i = 0; i < items.length; i++) {
      if (items[i].boughtBy == user.username) {
        purchaseItems.push(items[i])
      }
    }

    return purchaseItems;
  }

  getSoldItem(user: User): Item[] {
    const items: Item[] = this.getItems();
    let sold: Item[] = []

    for (let i = 0; i < items.length; i++) {
      if (items[i].hasBeenBought == true && items[i].username == user.username) {
        sold.push(items[i])
      }
    }

    return sold;
  }

  updateItem(item: Item): void {
    const items: Item[] = this.getItems()

    for (let i = 0; i < items.length; i++) {
      if (items[i].id == item.id) {
        item.lastUpdated = new Date().toUTCString();
        items[i] = item;
        localStorage.setItem('items', JSON.stringify(items));
        break;
      }
    }

  }


  getUserSession(): User {
    const userSessionJson = sessionStorage.getItem('user_session');
    if (userSessionJson == null || userSessionJson == '{}') {
      return new User();
    } else {
      const user: User = JSON.parse(userSessionJson);
      return user;
    }
  }

  setUserSession(user: User): void {
    sessionStorage.setItem('user_session', JSON.stringify(user))
  }

  createItem(item: Item): boolean {
    console.log("Je vais créer l'objet")
    console.log(item)
    let items: Item[] = JSON.parse(localStorage.getItem('items') || '{}')
    if (!(items instanceof Array)) {
      items = []
    }

    item.id = items.length

    items.push(item)
    localStorage.setItem('items', JSON.stringify(items));

    return true;
  }

  createUser(username: string, password: string, firstname: string, lastname: string, mail: string): boolean {

    if (this.getUserWithUsername(username) != undefined) {
      return false;
    }

    let user: User = new User();
    user.username = username;
    user.password = password;
    user.firstname = firstname;
    user.lastname = lastname;
    user.mail = mail;

    // For the project, all user with admin are admins
    if (user.username.startsWith('admin')) {
      user.admin = true;
    }

    let users: User[] = JSON.parse(localStorage.getItem('user') || '{}')
    if (!(users instanceof Array)) {
      users = []
    }
    users.push(user)
    localStorage.setItem('user', JSON.stringify(users));

    return true;
  }


  createAdmin(username: string): void {
    let user: User = new User();
    user.username = username;
    user.password = username;
    user.admin = true;
    let users: User[] = JSON.parse(localStorage.getItem('user') || '{}')
    users.push(user)
    localStorage.setItem('user', JSON.stringify(users));
  }

  getItems(): Item[] {
    return JSON.parse(localStorage.getItem('items') || '{}')
  }


  getFavoritesItems(user: User): Item[] {
    const items: Item[] = this.getItems();
    const favItems: Item[] = [];

    for (let i = 0; i < items.length; i++) {
      if (user.favorites.includes(items[i].id)) {
        favItems.push(items[i])
      }
    }

    return favItems;
  }


  getItem(id: number): Item | undefined {
    const items = this.getItems()

    for (let i = 0; i < items.length; i++) {
      if (items[i].id == id) {
        return items[i]
      }
    }

    return undefined;
  }

  getUser(username: string, pwd: string): undefined | User {
    const users = this.getUsers()

    for (let i = 0; i < users.length; i++) {
      if (users[i].username == username && users[i].password == pwd) {
        return users[i]
      }
    }

    return undefined;
  }


  getUserWithUsername(username: string): undefined | User {
    const users = this.getUsers()

    for (let i = 0; i < users.length; i++) {
      if (users[i].username == username) {
        return users[i]
      }
    }

    return undefined;
  }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem('user') || '{}')
  }

  updateUser(user: User) {
    const users: User[] = this.getUsers()

    for (let i = 0; i < users.length; i++) {
      if (users[i].username == user.username) {
        users[i] = user;
        localStorage.setItem('user', JSON.stringify(users));
        break;
      }
    }
  }
}
