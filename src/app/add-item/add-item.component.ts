import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewManagerService } from '../view-manager/view-manager.service';
import { DBManagerService } from '../dbmanager/dbmanager.service';
import { ErrorMessageComponent } from '../error-message/error-message.component';


@Component({
  selector: 'app-add-item',
  imports: [FormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent {
  vmanager: ViewManagerService;
  private db: DBManagerService;
  private error: ErrorMessageComponent;
  
  constructor(vmanager: ViewManagerService, db: DBManagerService, @Inject(ErrorMessageComponent) error: ErrorMessageComponent) {
    this.error = error;
    this.db = db;
    this.vmanager = vmanager;
  }

  onSubmit() {
    this.db.addDocument(this.vmanager.item!);
    this.vmanager.itemExists = true;
    this.error.setSuccessMessage('Item erfolgreich hinzugefügt');
  }
}
