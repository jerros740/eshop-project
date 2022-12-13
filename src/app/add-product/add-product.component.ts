import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Category } from '../shared/models/category';
import { Item } from '../shared/models/item';
import { StorageService } from '../shared/services/storage.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  fileSelected: File
  fileString: string | ArrayBuffer | null
  item: Item = new Item()
  itemForm: FormGroup
  onSubmitted: boolean = false;
  category: Category = new Category()

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    if (this.userService.logUser != undefined) {
      this.item.username = this.userService.logUser.username;
    }
  }

  ngOnInit(): void {
    if (this.userService.logUser.username == 'Guest') {
      this.router.navigate(['./login'])
      this._snackBar.open('You are not logged in', undefined, {
        duration: 1500
      })
    } else {
      this.itemForm = new FormGroup({
        title: new FormControl(this.item.title),
        description: new FormControl(this.item.description),
        price: new FormControl(this.item.price),
        category: new FormControl(this.item.category),
        img: new FormControl(null)
      });
    }
  }


  addItemToVerification(): void {
    this.onSubmitted = true;
    if (this.itemForm.valid) {
      var reader = new FileReader()
      reader.onload = () => {
        this.item.base64Image = reader.result;
        this.item.title = this.itemForm.get('title')?.value
        this.item.description = this.itemForm.get('description')?.value
        this.item.price = this.itemForm.get('price')?.value
        this.item.category = this.itemForm.get('category')?.value
        this.storageService.createItem(this.item)

      };
      reader.readAsDataURL(this.fileSelected);
      this.router.navigate(['./home']).then(()=>{
        window.location.reload()
      })
      
    }
  }

  onFileSelected(event: any): void {
    this.fileSelected = event.target.files[0]
    var reader = new FileReader()
    reader.onload = () => {
      this.fileString = reader.result
    };
    reader.readAsDataURL(this.fileSelected);
  }

  f() {
    return this.itemForm.controls;
  }
}


