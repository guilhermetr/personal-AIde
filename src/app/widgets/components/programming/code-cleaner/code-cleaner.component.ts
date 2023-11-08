import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-cleaner',
  templateUrl: './code-cleaner.component.html',
  styleUrls: ['./code-cleaner.component.scss']
})
export class CodeCleanerComponent implements OnInit {

  title: string = "Code Cleaner";

  constructor() { }

  ngOnInit(): void {
  }

}
