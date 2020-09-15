import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  docName = 'Vegetables';

  constructor(public db: AngularFirestore) {
  
  }

 
  getItem(itemKey){
    return this.db.collection('categories').doc(this.docName).collection('V001').doc(itemKey).snapshotChanges();
  }

  updateItem(itemKey, value){
    return this.db.collection('categories').doc(this.docName).collection('V001').doc(itemKey).set({
      ename: value.ename,
      hname: value.hname,
      unit: value.unit,
      price: Number(value.price),
      mrp: Number(value.mrp),
      id: Math.floor(Math.random() * Math.floor(9999999)),
      url: value.url,
    });;
  }

  deleteItem(itemKey){
     return this.db.collection('categories').doc(this.docName).collection('V001').doc(itemKey).delete();
  }

  getItems(){
    return  this.db.collection('categories').doc('Vegetables').collection('V001').snapshotChanges();
   }

    getAllItems(){
      var fruits = this.db.collection('categories').doc('Fruits').collection('Farm Fresh').snapshotChanges();
      }

  searchItems(searchValue){
    return this.db.collection('categories').doc(this.docName).collection('V001',ref => ref.where('ename', '>=', searchValue)
      .where('ename', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchItemsByCategory(value){
    this.docName = value;
    return this.db.collection('categories').doc(value).collection('V001').snapshotChanges();
  }


  createItem(value, category){
    return this.db.collection('categories').doc(category).collection('V001').add({
      ename: value.ename,
      hname: value.hname,
      unit: value.unit,
      price: Number(value.price),
      mrp: Number(value.mrp),
      id: Math.floor(Math.random() * Math.floor(9999999)),
      url: value.url,
    });
  }
}
