import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryHomeComponent } from './inventory-home/inventory-home.component';
import { StockEntryComponent } from './stock-entry/stock-entry.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { InventoryComponent } from './inventory.component';

const routes: Routes = [
  {
    path: '', component: InventoryComponent,
    children: [
      { path: '', redirectTo: '/inventory/home', pathMatch: 'full' },
      { path: 'home', component: InventoryHomeComponent },
      { path: 'stockEntry', component: StockEntryComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },

      // { path: 'demo', loadChildren : () => import('../content/demo/demo.module').then(m => m.DemoModule)}] }
  
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }


// @NgModule({
//   imports: [
//      RouterModule.forChild([
//      {
//        path: '',
//        loadChildren: () => import('./component1/component1.module').then(m => m.ComponentOneModule)
//     },
//     {
//       path: '',
//       loadChildren: () => import('./component2/component2.module').then(m => m.ComponentTwoModule)
//     }])
//     ]})
  
//     export class MainModule {}