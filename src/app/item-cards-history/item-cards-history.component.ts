import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Item } from '../shared/models/item';

@Component({
  selector: 'app-item-cards-history',
  templateUrl: './item-cards-history.component.html',
  styleUrls: ['./item-cards-history.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ItemCardsHistoryComponent implements OnInit {
  lowValue: number = 0;
  highValue: number = 3;
  @Input() items: Item[] = []

  constructor() { }

  ngOnInit(): void {
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
}
