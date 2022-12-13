import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../shared/models/item';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() items: Item[] = []

  options = [
    { name: "Sort by : Date : Recent to oldest", value: 'date-ascending' },
    { name: "Sort by : Date : Oldest to recent", value: 'date-descending' },
    { name: "Sort by : Price : Ascending", value: 'price-ascending' },
    { name: "Sort by : Price : Descending", value: 'price-descending' },
  ]

  selectedOption: string = this.options[0].name

  constructor() { }

  ngOnInit(): void {
  }

  sort(event: any): void {
    console.log(this.items)
    switch (event) {
      case this.options[0].name:
        this.sortByDate('asc');
        break;
      case this.options[1].name:
        this.sortByDate('desc');
        break;
      case this.options[2].name:
        this.sortByPrice('asc');
        break;
      case this.options[3].name:
        this.sortByPrice('desc');
        break;
      default:
        break;
    }
    console.log(this.items)
  }

  sortByDate(order: string): void {
    if(order == 'asc') {
      this.items.sort((a, b) => (a.date > b.date) ? 1 : -1);
    }

    if(order == 'desc') {
      this.items.sort((a, b) => (a.date < b.date) ? 1 : -1);
    }
    
  }

  sortByPrice(order: string): void {
    if(order == 'asc') {
      this.items.sort((a, b) => (a.price > b.price) ? 1 : -1);
    }

    if(order == 'desc') {
      this.items.sort((a, b) => (a.price < b.price) ? 1 : -1);
    }
  }
}
