import { Component } from '@angular/core';
import { RouteTableComponent } from './components/route-table/route-table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouteTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
  
})
export class App {
  protected title = 'route-table';
}
