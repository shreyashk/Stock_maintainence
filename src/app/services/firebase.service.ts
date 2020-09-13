import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getItem(itemKey){
    return this.db.collection('categories').doc('Vegetables').collection('V001').doc(itemKey).snapshotChanges();
  }

  updateItem(itemKey, value){
    return this.db.collection('categories').doc('Vegetables').collection('V001').doc(itemKey).set(value);
  }

  deleteItem(itemKey){
    return this.db.collection('categories').doc('Vegetables').collection('V001').doc(itemKey).delete();
  }

  getItems(){
    return  this.db.collection('categories').doc('Vegetables').collection('V001').snapshotChanges();
   }

    getAllItems(){
      var fruits = this.db.collection('categories').doc('Fruits').collection('Farm Fresh').snapshotChanges();
      }

  searchItems(searchValue){
    return this.db.collection('categories',ref => ref.where('ename', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchItemsByCategory(value){
    return this.db.collection('items',ref => ref.where('category', '>=', value)
    .where('category', '<=', value + '\uf8ff'))
    .snapshotChanges()
  }


  createItem(value){
    return this.db.collection('categories').doc('Vegetables').collection('V001').add({
      ename: value.ename,
      hname: value.hname,
      unit: value.unit,
      price: value.price,
      mrp: value.mrp,
      id: value.id,
      url: value.url,
    });
  }
}
