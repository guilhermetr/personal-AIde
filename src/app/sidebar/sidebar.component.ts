import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('sidebarState', [
      state('collapsed', style({
        width: '50px',
      })),
      state('expanded', style({
        width: '200px',
      })),
      transition('expanded <=> collapsed', animate(100)),
    ])
  ]
})
export class SidebarComponent implements OnInit {
  isCollapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
