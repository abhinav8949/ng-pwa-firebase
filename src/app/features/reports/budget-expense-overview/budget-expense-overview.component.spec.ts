import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetExpenseOverviewComponent } from './budget-expense-overview.component';

describe('BudgetExpenseOverviewComponent', () => {
  let component: BudgetExpenseOverviewComponent;
  let fixture: ComponentFixture<BudgetExpenseOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetExpenseOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetExpenseOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
