import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { PosComponent } from './pos/pos.component';
import { PosComponent } from './pos/pos.component';
import { PosLineComponent } from './pos-line/pos-line.component';

const routes: Routes = [
  // { path: '', component: PosComponent },
  { path: 'pos', component: PosComponent },
  { path: 'posline', component: PosLineComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
