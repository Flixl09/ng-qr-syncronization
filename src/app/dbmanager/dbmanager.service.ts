import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { ItemModule } from '../item/item.module';

@Injectable({
  providedIn: 'root',
  
})
export class DBManagerService {
  private db: PouchDB.Database;

  constructor() {
    this.db = new PouchDB('auadb');
  }

  addDocument(item: ItemModule) {
    this.db.put(item).then(response => {
      console.log('Document added successfully:', response);
    }).catch(error => {
      console.error('Error adding document:', error);
    });
  }

  getDocument(id: string, callback: Function) {
    this.db.get(id).then(doc => {
      console.log('Document retrieved successfully:', doc);
      callback(doc);
    }).catch(error => {
      console.error('Error retrieving document:', error);
    });
  }

  getAllDocuments(callback: Function) {
    this.db.allDocs({ include_docs: true }).then(result => {
      console.log('All documents retrieved successfully:', result.rows);
      callback(result.rows);
    }).catch(error => {
      console.error('Error retrieving all documents:', error);
    });
  }

  deleteDocument(id: string) {
    this.db.get(id).then(doc => {
      return this.db.remove(doc);
    }).then(response => {
      console.log('Document deleted successfully:', response);
    }).catch(error => {
      console.error('Error deleting document:', error);
    });
  }

  updateDocument(item: ItemModule) {
    this.db.put(item.toString()).then(response => {
      console.log('Document updated successfully:', response);
    }).catch(error => {
      console.error('Error updating document:', error);
    });
  }
  
}
