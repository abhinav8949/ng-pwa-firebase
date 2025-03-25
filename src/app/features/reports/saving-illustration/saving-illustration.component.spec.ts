import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingIllustrationComponent } from './saving-illustration.component';

describe('SavingIllustrationComponent', () => {
  let component: SavingIllustrationComponent;
  let fixture: ComponentFixture<SavingIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavingIllustrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavingIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
