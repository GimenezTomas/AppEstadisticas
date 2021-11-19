import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalAgregarFaltaComponent } from './modal-agregar-falta.component';

describe('ModalAgregarFaltaComponent', () => {
  let component: ModalAgregarFaltaComponent;
  let fixture: ComponentFixture<ModalAgregarFaltaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgregarFaltaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAgregarFaltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
