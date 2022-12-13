import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SavedComponent } from './saved/saved.component';
import { ItemCardsComponent } from './item-cards/item-cards.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DialogModule } from 'primeng/dialog'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HistoryComponent } from './history/history.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator'
import { ItemCardsHistoryComponent } from './item-cards-history/item-cards-history.component';
import { MatSelectModule } from '@angular/material/select';
import { FilterComponent } from './filter/filter.component';
import { PaginatorComponent } from './paginator/paginator.component';
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
  declarations: [
    AppComponent,
    NavHeaderComponent,
    HomeComponent,
    LoginComponent,
    SavedComponent,
    ItemCardsComponent,
    AddProductComponent,
    HistoryComponent,
    ItemCardsHistoryComponent,
    FilterComponent,
    PaginatorComponent,
    AccountComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    MatPaginatorModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    DialogModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatTabsModule,
    MatSnackBarModule,
    MatSelectModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
