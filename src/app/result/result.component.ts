import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../shared/models/item';
import { StorageService } from '../shared/services/storage.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  searchValue: string;
  items: Item[] = [];

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.searchValue = this.route.snapshot.paramMap.get('searchValue') || "";
    this.items = this.storageService.getItemsWithKeyword(this.searchValue, this.userService.logUser);


  }

}
