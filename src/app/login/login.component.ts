import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameLogin: string;
  pwdLogin: string;
  usernameCreate: string = "";
  pwdCreate: string = "";
  pwdCheck: string = "";

  loginForm: FormGroup
  createForm: FormGroup



  isLoginSubmitted: boolean = false;
  isCreateSubmitted: boolean = false;
  isUsernameTaken: boolean = false;
  isPasswordCreateValid: boolean = false;
  isPasswordCheckValid: boolean = false;

  loginSuccess: boolean = false;

  @Input() loginPage = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.usernameLogin = "";
    this.pwdLogin = ""
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      usernameLogin: new FormControl(this.usernameLogin),
      pwdLogin: new FormControl(this.pwdCheck)
    });
    this.createForm = new FormGroup({
      usernameCreate: new FormControl(this.usernameCreate),
      pwdCreate: new FormControl(this.pwdCreate),
      pwdCheck: new FormControl(this.pwdCheck)
    });
  }

  login(): void {
    this.isLoginSubmitted = true;
    if (this.loginForm.valid) {
      if (this.userService.loginUser(this.loginForm.get('usernameLogin')?.value, this.loginForm.get('pwdLogin')?.value)) {
        this.router.navigate(['/home']);
        this._snackBar.open('Welcome ' + this.userService.logUser.username, undefined, {
          duration: 1500
        })
      } else {
        this.loginSuccess = false;
      }

    }
  }

  createAccount(): void {
    
    this.isCreateSubmitted = true;
    this.pwdCreate = this.createForm.get('pwdCreate')?.value
    this.pwdCheck = this.createForm.get('pwdCheck')?.value
    this.usernameCreate = this.createForm.get('usernameCreate')?.value

    this.isUsernameTaken = this.userService.checkIfUsernameExist(this.usernameCreate)
    this.isPasswordCreateValid = this.pwdCreate.length >= 6
    this.isPasswordCheckValid = this.isPasswordValid() && this.isPasswordCreateValid

    if (this.createForm.valid && !this.isUsernameTaken && this.isPasswordCreateValid) {
      console.log(this.userService.createUser(this.usernameCreate, this.pwdCreate));
      this.router.navigate(['/home']);
    }

  }

  isPasswordValid(): boolean {
    return this.pwdCheck == this.pwdCreate;
  }



  checkIfUsernameExist(username: string): boolean {
    return this.userService.checkIfUsernameExist(username);;
  }

  isLogin(): boolean {
    return this.userService.logUser.username != 'Guest'
  }
}
