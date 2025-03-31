import { Routes } from '@angular/router';
import { QRViewComponent } from './qrview/qrview.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { AddItemComponent } from './add-item/add-item.component';

export const routes: Routes = [
    {
        path: 'qr-scanner',
        component: QRViewComponent
    },
    {
        path: 'list',
        component: ListItemsComponent
    },
    {
        path: 'add',
        component: AddItemComponent
    }
];
