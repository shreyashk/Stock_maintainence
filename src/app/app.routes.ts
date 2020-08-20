import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewItemComponent } from './new-item/new-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { EditItemResolver } from './edit-item/edit-item.resolver';

export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-user', component: NewItemComponent },
  { path: 'details/:id', component: EditItemComponent, resolve:{data : EditItemResolver} }
];
