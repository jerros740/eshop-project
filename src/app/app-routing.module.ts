import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SavedComponent } from './saved/saved.component';
import { HistoryComponent } from './history/history.component';
import { AccountComponent } from './account/account.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'saved', component: SavedComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'add_product', component: AddProductComponent },
  { path: 'account', component: AccountComponent },
  { path: 'result/:searchValue', component: ResultComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
