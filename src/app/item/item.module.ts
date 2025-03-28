import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ItemModule {
  _id?: string;
  article?: string;
  amountInStock?: number;
  deleted?: boolean;

  public static fromISOOSIBACSICS(item: string): ItemModule {
    const itemObj = new ItemModule();
    const parts = item.split(';');
  
    parts.forEach(part => {
      const [key, value] = part.split(':');
      switch (key.trim()) {
        case 'id':
          itemObj._id = value.trim();
          break;
        case 'article':
          itemObj.article = value.trim();
          break;
        case 'amountInStock':
          itemObj.amountInStock = parseInt(value.trim(), 10);
          break;
        case 'deleted':
          itemObj.deleted = value.trim().toLowerCase() === 'true';
          break;
      }
    });
    if (itemObj._id === undefined) {
      itemObj._id = new Date().getTime().toString();
    }
    console.log(itemObj);
    return itemObj;
  }
  

  public toString(): string {
    return `{"id":${this._id},"article":"${this.article}","amountInStock":${this.amountInStock},"deleted":${this.deleted}}`;
  }
}
