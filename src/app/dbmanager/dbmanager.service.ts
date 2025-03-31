import { Injectable, OnInit } from '@angular/core';
import PouchDB from 'pouchdb';
import { ItemModule } from '../item/item.module';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class DBManagerService{
  private db: PouchDB.Database;
  private updateListener: Function = () => {};

  constructor() {
    this.db = new PouchDB('auadb');
    this.syncDB();
  }

  setUpdateListener(callback: Function) {
    this.updateListener = callback;
  }

  async addDocument(item: ItemModule): Promise<boolean> {
    let exists: ItemModule | undefined;
    await this.getDocument(item._id!, (doc: any) => {exists = doc;});
    console.log('Document exists:', exists);
    if (exists !== undefined) {
      console.log('Document already exists, updating instead:', item);
      exists!.amountInStock = item.amountInStock;
      exists!.article = item.article;
      exists!.deleted = item.deleted;
      return this.updateDocument(exists!);
    }

    const addItem = {
      _id: item._id,
      article: item.article,
      amountInStock: item.amountInStock,
      deleted: item.deleted,
    };
    this.db.put(addItem).then(response => {
      console.log('Document added successfully:', response);
      this.updateListener();
    }).catch(error => {
      console.error('Error adding document:', error);
    });
    return true;
  }

  async getDocument(id: string, callback: Function){
    await this.db.get(id).then(doc => {
      console.log('Document retrieved successfully:', doc);
      callback(doc);
    }).catch(error => {
      if (error.status === 404) {
        console.log('Document not found');
        callback(undefined);
      }
      else {
        console.error('Error retrieving document:', error);
      }
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

  deleteDocument(id: string, callback: Function) {
    this.db.get(id).then(doc => {
      this.db.remove(doc);
      callback()
    }).then(response => {
      console.log('Document deleted successfully:', response);
    }).catch(error => {
      console.error('Error deleting document:', error);
    });
  }

  updateDocument(item: ItemModule): boolean {
    this.db.put(item).then(response => {
      console.log('Document updated successfully:', response);
      this.updateListener();
    }).catch(error => {
      console.error('Error updating document:', error);
      return false;
    });
    return true;
  }

  syncDB() {
    console.log('Syncing database...');
    const remoteDB = new PouchDB('http://localhost:5984/auadb');
    this.db.sync(remoteDB, {
      live: true,
      retry: true,
    }).on('change', (info) => {
      console.log('Database changed:', info);
    }).on('paused', (err) => {
      console.log('Replication paused:', err);
    }).on('denied', (err) => {
      console.log('Replication denied:', err);
    }).on('complete', (info) => {
      console.log('Replication completed:', info);
    }).on('error', (err) => {
      console.error('Replication error:', err);
    });
  }
  
}
