import { Component } from '@angular/core';
import { QRCodeScannerComponent } from "../qrcode-scanner/qrcode-scanner.component";
import { ListItemsComponent } from "../list-items/list-items.component";

@Component({
  selector: 'app-qrview',
  imports: [QRCodeScannerComponent, ListItemsComponent],
  templateUrl: './qrview.component.html',
  styleUrl: './qrview.component.scss'
})
export class QRViewComponent {

}
