import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// RC::
// import { PosModule } from './pos/pos.module';
// import { AdminModule } from './admin/admin.module';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  // { path: '**', redirectTo: ''},

  // RC::
  // { path: 'pos', loadChildren: 'app/pos/pos.module#PosModule' },
  // {path: '', loadChildren: './home#HomeModule'},
  // {path: '', loadChildren: 'app/pos/home.module.ts#HomeModule'},
  //  loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
  // {path: '', loadChildren: 'src/app/pos/pos.module#PosModule'},
  //{path: 'pos', loadChildren: 'src/app/pos/pos.module#PosModule'},
  // {path: 'pos', loadChildren: './pos/pos.module#PosModule'},
  //{path: '', loadChildren: './pos/pos.module#PosModule'},
  {path: 'pos', loadChildren: './pos/pos.module#PosModule' },

  // {path: '', loadChildren: 'src/app/admin/admin.module#AdminModule'},
  // {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
  //{path: '', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),},

  { path: 'user', loadChildren: './user/user.module#UserModule' },
  {path: 'product', loadChildren: './product/product.module#ProductModule'},

  // { path: 'inventory', loadChildren: 'app/inventory/inventory.module#InventoryModule' },
  { path: 'inventory', loadChildren: './inventory/inventory.module#InventoryModule' },

  // loadChildren: "../app/posts/posts.module#PostsModule"

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }