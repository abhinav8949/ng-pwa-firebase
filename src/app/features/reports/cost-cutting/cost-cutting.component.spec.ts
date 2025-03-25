import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCuttingComponent } from './cost-cutting.component';

describe('CostCuttingComponent', () => {
  let component: CostCuttingComponent;
  let fixture: ComponentFixture<CostCuttingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostCuttingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostCuttingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
