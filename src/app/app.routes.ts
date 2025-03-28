import { Routes } from '@angular/router';
import { QRViewComponent } from './qrview/qrview.component';

export const routes: Routes = [
    {
        path: 'qr-scanner',
        component: QRViewComponent
    }
];
