import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarClientes } from './cadastrar-clientes';

describe('CadastrarClientes', () => {
  let component: CadastrarClientes;
  let fixture: ComponentFixture<CadastrarClientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarClientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarClientes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
