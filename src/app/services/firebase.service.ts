import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getItem(itemKey){
    return this.db.collection('items').doc(itemKey).snapshotChanges();
  }

  updateItem(itemKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('items').doc(itemKey).set(value);
  }

  deleteItem(itemKey){
    return this.db.collection('items').doc(itemKey).delete();
  }

  getItems(){
    return this.db.collection('items').snapshotChanges();
  }

  searchItems(searchValue){
    return this.db.collection('items',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchItemsByCategory(value){
    return this.db.collection('items',ref => ref.where('category', '>=', value)
    .where('category', '<=', value + '\uf8ff'))
    .snapshotChanges()
  }


  createItem(value){
    return this.db.collection('items').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      quantity: value.quantity,
      price: value.price,
      category: value.category,
      imageSource: value.imageSource
    });
  }
}
