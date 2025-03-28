import { Component, Inject } from '@angular/core';
import { DBManagerService } from '../dbmanager/dbmanager.service';
import { NgFor } from '@angular/common';
import { ItemModule } from '../item/item.module';

@Component({
  selector: 'app-list-items',
  imports: [NgFor],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.scss'
})
export class ListItemsComponent {
  private db!: DBManagerService;

  public items: ItemModule[] = []

  constructor(@Inject(DBManagerService) db: DBManagerService) {
    this.db = db;
    this.getItems();
  }

  getItems() {
    this.db.getAllDocuments((result: any) => {
      
    }
  }

  reload() {
    this.getItems();
  }

  deleteItem(id: number) {
    const id_string = id.toString();
    this.db.deleteDocument(id_string);
    this.reload();
  }

  updateItem(item: ItemModule) {
    this.db.updateDocument(item);
    this.reload();
  }

  addItem(item: ItemModule) {
    this.db.addDocument(item);
    this.reload();
  }
} 
