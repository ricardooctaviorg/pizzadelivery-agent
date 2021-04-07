import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalTypingFailPage } from './modal-typing-fail.page';

describe('ModalTypingFailPage', () => {
  let component: ModalTypingFailPage;
  let fixture: ComponentFixture<ModalTypingFailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTypingFailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalTypingFailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
