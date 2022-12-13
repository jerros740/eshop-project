import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  isNewPasswordValid: boolean = false;
  isCheckPasswordValid: boolean = false;

  isFormSubmitted: boolean = false;
  passwordForm: FormGroup

  newPwd: string = '';
  checkPwd: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.userService.logUser.username == 'Guest') {
      this.router.navigate(['./login'])
    } else {
      this.user = this.userService.logUser
      this.passwordForm = new FormGroup({
        newPwd: new FormControl(this.newPwd),
        checkPwd: new FormControl(this.checkPwd)
      });
    }

  }

  edit(): void {
    if (this.canEdit == true) {
      console.log(this.userService.logUser)
      this.userService.update();
      
      this.canEdit = false;

    } else {
      this.canEdit = true;
    }

  }


  changePassword(): void {
    this.isFormSubmitted = true;
    if(this.isPasswordValid()) {
      this.userService.logUser.password = this.passwordForm.get('newPwd')?.value;
      this.userService.update();
      this.router.navigate(['./home'])
      this._snackBar.open('Password has been changed', undefined, {
        duration: 1500
      })
    }
  }

  isPasswordValid(): boolean {
    return this.passwordForm.get('newPwd')?.value == this.passwordForm.get('checkPwd')?.value && this.passwordForm.get('newPwd')?.value.length >= 6
  }
}
