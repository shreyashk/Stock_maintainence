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
      id: [''],
      url: [''],
    });
  }

  resetFields(){
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      imageSource: new FormControl(''),
    });
  }

  onSubmit(value){
    this.firebaseService.createItem(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }

}
