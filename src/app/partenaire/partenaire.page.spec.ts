import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartenairePage } from './partenaire.page';

describe('PartenairePage', () => {
  let component: PartenairePage;
  let fixture: ComponentFixture<PartenairePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PartenairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
