import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {

  exampleForm: FormGroup;

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'category': [
      { type: 'required', message: 'category is required.' }
    ],
    'quantity': [
      { type: 'required', message: 'quantity is required.' },
    ],
    'price': [
     { type: 'required', message: 'price is required.' },
   ]
  };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      ename: [''],
      hname: [''],
      unit: [''],
      price: [''],
      mrp: [''],
      category: [''],
      url: [''],
      deal: ['false']
    });
  }

  resetFields(){
    this.exampleForm = this.fb.group({
      ename: new FormControl(''),
      hname: new FormControl(''),
      unit: new FormControl(''),
      price: new FormControl(''),
      mrp: new FormControl(''),
      category: new FormControl(''),
      url: new FormControl(''),
     // deal: new FormControl(''),
    });
  }

  onSubmit(value){
    console.log("Selected value is", value.category);
    this.firebaseService.createItem(value, value.category)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }

}
