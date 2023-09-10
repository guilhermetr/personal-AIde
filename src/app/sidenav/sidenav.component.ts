import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { SideNavToggle } from '../utils/sidenav-toggle';
import { navbarData } from './nav-data';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('100ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('slideHorizontallyAndRotate', [
      state('false', style({
        transform: 'translateX(0) rotate(0)'
      })),
      state('true', style({
        transform: 'translateX(-50%) rotate(180deg)'
      })),
      transition('false => true', animate('300ms ease-in')),
      transition('true => false', animate('300ms ease-out'))
    ]),
    trigger('slideVertically', [
      state('hidden', style({
        height: '0px',
        opacity: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*',
        opacity: '1'
      })),
      transition('hidden <=> visible', [
        animate('300ms ease-in-out')
      ])
    ]),
    trigger('rotateCaret', [
      state('down', style({ transform: 'rotate(0deg)' })),
      state('up', style({ transform: 'rotate(-180deg)' })),
      transition('down <=> up', [
        animate('250ms ease-in-out')
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  submenuCollapsed: { [key: string]: boolean } = {} // Indicates if submenus are collapsed
  screenWidth = 0;
  navData = navbarData

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.navData.forEach(data => {
      if (data.children) {
        this.submenuCollapsed[data.label] = true;
      }
    });    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = true;
      this.onToggleSidenav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
    }
  }  

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSidenav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  toggleSubmenu(label: string): void {
    this.submenuCollapsed[label] = !this.submenuCollapsed[label];
  }

  isSubmenu(data: any): boolean {
    return data.children;
  }

  isSubmenuActive(data: any): boolean {
    return !this.submenuCollapsed[data.label] || this.isChildRouteActive(data);
  }

  // When a child route from the submenu is active (even if its collapsed)
  isChildRouteActive(data: any): boolean {
    let isActive = false;
    if (data.children) {
        for (const child of data.children) {
            if (this.router.isActive(child.routerLink, true)) {
                isActive = true;
                break;
            }
        }
    }
    return isActive;
  }

}
