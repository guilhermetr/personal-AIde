import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { SideNavToggle } from '../utils/sidenav-toggle';
import { navbarData } from './nav-data';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
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
  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  submenusState: { [key: string]: boolean } = {} // Indicates if submenus are collapsed
  screenWidth = 0;
  navData = navbarData

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.navData.forEach(data => {
      if (data.children) {
        this.submenusState[data.label] = true;
      }
    })
  }

  ngAfterViewInit() {
    const submenuToggleElements = this.elementRef.nativeElement.querySelectorAll('.submenu-toggle');    
    submenuToggleElements.forEach((toggleElement: any) => {      
      toggleElement.addEventListener('click', () => {
        toggleElement.classList.toggle('active');
        const submenuElement = toggleElement.nextElementSibling; // <ul> element
        submenuElement.classList.toggle('active');
      });
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

  closeSidenav(): void {
    this.collapsed = true;
    this.onToggleSidenav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  toggleSubmenu(key: string): void {
    this.submenusState[key] = !this.submenusState[key];
  }

}
