import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DynamicComponentConfig } from 'src/app/models/dynamic-component-config.model';
import { SelectWidgetDialogComponent } from 'src/app/widgets/components/select-widget-dialog/select-widget-dialog.component';
import { Widget } from 'src/app/widgets/models/widget.model';
import { WidgetService } from 'src/app/widgets/services/widget.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selectedWidgets: Widget[] = [];
  widgetComponents: DynamicComponentConfig[] = [];   

  constructor(public dialog: MatDialog, private widgetService: WidgetService) {}

  ngOnInit(): void {}

  openWidgetDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { selectedWidgets: this.selectedWidgets };
    const dialogRef = this.dialog.open(SelectWidgetDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((widgets: Widget[]) => {
      if (widgets) {
        this.updateWidgets(widgets);
      }
    });
  }

  updateWidgets(selectedWidgets: Widget[]): void {
    this.selectedWidgets = selectedWidgets;
    this.widgetComponents = selectedWidgets.map((widget: Widget): DynamicComponentConfig => ({
      component: this.widgetService.getWidgetComponent(widget.cardType)!,
      inputs: {
        title: widget.name
      }
    }));
  }

}
