import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemToolsComponent } from './item-tools.component';

describe('ItemToolsComponent', () => {
  let component: ItemToolsComponent;
  let fixture: ComponentFixture<ItemToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
