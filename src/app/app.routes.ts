import { Routes } from '@angular/router';
import { QRCodeScannerComponent } from './qrcode-scanner/qrcode-scanner.component';

export const routes: Routes = [
    {
        path: 'qr-scanner',
        component: QRCodeScannerComponent
    }
];
