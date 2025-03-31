import { Injectable } from '@angular/core';
import { ItemModule } from '../item/item.module';

@Injectable({
  providedIn: 'root'
})
export class ViewManagerService {
  public itemSelected: boolean = false;
  public itemExists: boolean = false;
  public item?: ItemModule;
}
