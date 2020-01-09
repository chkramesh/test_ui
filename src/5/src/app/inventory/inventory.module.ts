import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesComponent } from './categories/categories.component';
import { InventoryHomeComponent } from './inventory-home/inventory-home.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { StockEntryComponent } from './stock-entry/stock-entry.component';

import { ProductsComponent } from './products/products.component';
import { InventoryComponent } from './inventory.component';
import { AppMaterialModule } from '../app-material/app-material.module';

@NgModule({
  declarations: [
    InventoryComponent,
    StockEntryComponent,
    ProductsComponent,
    CategoriesComponent,
    InventoryHomeComponent,
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    AppMaterialModule

  ]
})
export class InventoryModule { }
