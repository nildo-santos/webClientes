import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClientes } from './dashboard-clientes';

describe('DashboardClientes', () => {
  let component: DashboardClientes;
  let fixture: ComponentFixture<DashboardClientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardClientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardClientes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
