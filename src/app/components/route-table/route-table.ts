import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route } from '../../models/route.model';
import { MOCK_ROUTES } from '../../data/mock-routes';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NgZone } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-route-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './route-table.html',
  styleUrl: './route-table.scss',
  
})
export class RouteTableComponent implements OnInit {
  routes: Route[] = [];
  sortedBy: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    of(MOCK_ROUTES).pipe(delay(5)).subscribe((data) => {
      this.ngZone.run(() => {
        this.routes = data;
        this.cdr.detectChanges(); 
      });
    });
  }
  

  sort(field: keyof Route): void {
    if (this.sortedBy === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedBy = field;
      this.sortDirection = 'asc';
    }

    this.routes.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (field === 'address' || field === 'gateway') {
        return this.compareIp(aValue, bValue);
      }

      return this.compareStrings(aValue, bValue);
    });

    if (this.sortDirection === 'desc') {
      this.routes.reverse();
    }
  }

  private compareIp(a: string, b: string): number {
    const aParts = a.split('.').map(Number);
    const bParts = b.split('.').map(Number);

    for (let i = 0; i < 4; i++) {
      if (aParts[i] < bParts[i]) return -1;
      if (aParts[i] > bParts[i]) return 1;
    }
    return 0;
  }

  private compareStrings(a: string, b: string): number {
    return a.localeCompare(b);
  }

  exportToCSV(): void {
    const headers = ['UUID', 'Адрес назначения', 'Маска', 'Шлюз', 'Интерфейс'];
    const rows = this.routes.map(route => [
      route.uuid,
      route.address,
      route.mask,
      route.gateway,
      route.interface
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(val => `"${val}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = 'routes.csv';
    anchor.click();
  }
}
