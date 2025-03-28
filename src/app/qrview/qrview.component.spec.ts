import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRViewComponent } from './qrview.component';

describe('QRViewComponent', () => {
  let component: QRViewComponent;
  let fixture: ComponentFixture<QRViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QRViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
