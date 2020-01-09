import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { WelcomeComponent }  from './welcome.component';
import { DashboardLayoutComponent }  from './dashboard.layout.component';
import { PageNotFoundComponent }  from './page-not-found.component';
import { AuthGuardService }  from './auth-guard.service';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/welcome',
  //   pathMatch: 'full'
  // },    
 {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },  

  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'address',
        // loadChildren: 'app/address/address.module#AddressModule'
        // loadChildren: 'app/address/address.module#AddressModule'
        loadChildren: './address/address.module#AddressModule'
      },
      {
        path: 'admin',
        // loadChildren: 'app/admin/admin.module#AdminModule',
        // loadChildren: 'app/admin/admin.module#AdminModule',
        loadChildren: './admin/admin.module#AdminModule',
        canLoad: [ AuthGuardService ]
      },
      {
        path: 'welcome',
        component: WelcomeComponent 
      },	      	      
      {
        path: '**',
        component: PageNotFoundComponent 
      }	
    ]
  }  	
];

@NgModule({
  imports: [ 
      RouterModule.forRoot(routes,
      {
        preloadingStrategy: PreloadAllModules
      }) 
  ],
  exports: [ 
      RouterModule 
  ],
  providers: [ AuthGuardService ]
})
export class AppRoutingModule { } 