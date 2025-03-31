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
    this.db.setUpdateListener(this.reload.bind(this));
    this.getItems();
  }

  getItems() {
    this.db.getAllDocuments((result: any) => {
      this.items = result.map((item: any) => {
        const itemObj = new ItemModule();
        itemObj._id = item.id;
        itemObj.article = item.doc.article;
        itemObj.amountInStock = item.doc.amountInStock;
        itemObj.deleted = item.doc.deleted;
        return itemObj;
      });
    });
  }

  reload() {
    this.getItems();
  }

  deleteItem(id: string) {
    this.db.deleteDocument(id, this.reload.bind(this));
  }
} 
