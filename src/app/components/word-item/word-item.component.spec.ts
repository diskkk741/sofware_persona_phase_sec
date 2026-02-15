import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordItemComponent } from './word-item.component';

describe('WordItemComponent', () => {
  let component: WordItemComponent;
  let fixture: ComponentFixture<WordItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WordItemComponent]
    });
    fixture = TestBed.createComponent(WordItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
