import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;

//   validation_messages = {
//    'name': [
//      { type: 'required', message: 'Name is required.' }
//    ],
//    'category': [
//      { type: 'required', message: 'category is required.' }
//    ],
//    'quantity': [
//      { type: 'required', message: 'quantity is required.' },
//    ],
//    'price': [
//     { type: 'required', message: 'price is required.' },
//   ]
//  };

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      console.log("data", data);
      if (data) {
        this.item = data.payload.data();
        console.log("Data", this.item);
        this.item.id = data.payload.id;
        this.createForm();
      }
    })
  }

  createForm() {
    this.exampleForm = this.fb.group({
      ename: [this.item.ename],
      hname: [this.item.hname],
      unit: [this.item.unit],
      price: [this.item.price],
      mrp: [this.item.mrp],
      id: [this.item.id],
      url: [this.item.url],
      deal: [this.item.deal],
    });
  }



  onSubmit(value){
    this.firebaseService.updateItem(this.item.id, value)
    .then(
      res => {
        this.router.navigate(['/home']);
      }
    )
  }

  delete(){
    this.firebaseService.deleteItem(this.item.id)
    .then(
      res => {
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    )
  }

  cancel(){
    this.router.navigate(['/home']);
  }

}
