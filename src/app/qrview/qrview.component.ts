import { Component } from '@angular/core';
import { QRCodeScannerComponent } from "../qrcode-scanner/qrcode-scanner.component";
import { ListItemsComponent } from "../list-items/list-items.component";
import { AddItemComponent } from "../add-item/add-item.component";
import { NgIf } from '@angular/common';
import { ViewManagerService } from '../view-manager/view-manager.service';

@Component({
  selector: 'app-qrview',
  imports: [QRCodeScannerComponent, ListItemsComponent, AddItemComponent, NgIf],
  templateUrl: './qrview.component.html',
  styleUrl: './qrview.component.scss'
})
export class QRViewComponent {
  vmanager: ViewManagerService;
  constructor(vmanager: ViewManagerService) {
    this.vmanager = vmanager;
  }
}
