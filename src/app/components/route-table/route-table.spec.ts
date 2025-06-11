import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteTableComponent } from './route-table';
import { Route } from '../../models/route.model';

describe('RouteTableComponent', () => {
  let component: RouteTableComponent;
  let fixture: ComponentFixture<RouteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RouteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('compareIp()', () => {
    it('should return 0 for equal IPs', () => {
      expect(component['compareIp']('192.168.0.1', '192.168.0.1')).toBe(0);
    });

    it('should return -1 when first IP is smaller', () => {
      expect(component['compareIp']('10.0.0.1', '10.0.0.2')).toBeLessThan(0);
    });

    it('should return 1 when first IP is greater', () => {
      expect(component['compareIp']('192.168.1.1', '192.168.0.1')).toBeGreaterThan(0);
    });
  });

  describe('compareStrings()', () => {
    it('should return 0 for equal strings', () => {
      expect(component['compareStrings']('eth0', 'eth0')).toBe(0);
    });

    it('should return -1 for alphabetical order', () => {
      expect(component['compareStrings']('eth0', 'eth1')).toBeLessThan(0);
    });

    it('should return 1 for reverse alphabetical order', () => {
      expect(component['compareStrings']('wan1', 'eth0')).toBeGreaterThan(0);
    });
  });

  describe('sort()', () => {
    it('should sort by address ascending then descending', () => {
      component.routes = [
        { uuid: '1', address: '10.0.0.2', mask: '', gateway: '1.1.1.1', interface: '' },
        { uuid: '2', address: '10.0.0.1', mask: '', gateway: '1.1.1.1', interface: '' }
      ];

      component.sort('address');
      const asc = component.routes.map(r => r.address);
      expect(asc).toEqual(['10.0.0.1', '10.0.0.2']);

      component.sort('address');
      const desc = component.routes.map(r => r.address);
      expect(desc).toEqual(['10.0.0.2', '10.0.0.1']);
    });
  });
});
