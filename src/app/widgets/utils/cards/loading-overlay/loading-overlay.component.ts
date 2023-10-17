import { Component, Input } from '@angular/core';

@Component({
  selector: 'widgets-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent {
  @Input() isLoading: boolean = false;
}
