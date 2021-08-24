import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalBorrarDeporteComponent } from './modal-borrar-deporte.component';

describe('ModalBorrarDeporteComponent', () => {
  let component: ModalBorrarDeporteComponent;
  let fixture: ComponentFixture<ModalBorrarDeporteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBorrarDeporteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalBorrarDeporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
