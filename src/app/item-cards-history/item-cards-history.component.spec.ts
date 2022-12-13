import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardsHistoryComponent } from './item-cards-history.component';

describe('ItemCardsHistoryComponent', () => {
  let component: ItemCardsHistoryComponent;
  let fixture: ComponentFixture<ItemCardsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCardsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
