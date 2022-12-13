import { NONE_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { isEmpty } from 'rxjs';
import { User } from '../models/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  logUser: User = new User()
  constructor(private storageService: StorageService) {
    this.logUser = storageService.getUserSession();
    console.log(this.logUser);
  }

  createUser(username: string, password: string, firstname: string = "", lastname: string = "", mail: string = ""): boolean {
    return this.storageService.createUser(username, password, firstname, lastname, mail);
  }

  loginUser(username: string, pwd: string): boolean {
    const user: User | undefined = this.storageService.getUser(username, pwd)
    console.log(user)
    if (user == undefined) {
      return false;
    } else {
      this.logUser = user;
      this.storageService.setUserSession(this.logUser);
      return true;
    }
  }

  logout(): void {
    this.logUser = new User();
    this.storageService.setUserSession(this.logUser);
  }

  update() {
    this.storageService.updateUser(this.logUser)
  }

  checkIfUsernameExist(username: string): boolean {
    const exist: boolean = this.storageService.getUserWithUsername(username) === undefined ? false : true;
    return exist;
  }

  createAdmin(username: string): void {
    this.storageService.createAdmin(username)
  }

}
