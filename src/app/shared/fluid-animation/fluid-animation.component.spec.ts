import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluidAnimationComponent } from './fluid-animation.component';

describe('FluidAnimationComponent', () => {
  let component: FluidAnimationComponent;
  let fixture: ComponentFixture<FluidAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluidAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluidAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
