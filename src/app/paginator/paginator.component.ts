import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Item } from '../shared/models/item';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  lowValue: number;
  highValue: number;
  
  @Output() outLowValue = new EventEmitter<number>();
  @Output() outHighValue = new EventEmitter<number>();
  @Input() items: Item[] = []
  @Input() pageSize: number;
  constructor() { }

  ngOnInit(): void {
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    
    this.outLowValue.emit(this.lowValue);
    this.outHighValue.emit(this.highValue);
    return event;
  }
}