import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/auth-guard.service';
import { TabComponent } from './tab/tab.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'address',
    loadChildren: () => import('./address/address.module').then(m => m.AddressModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'payments',
    loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./my-orders/my-orders.module').then(m => m.MyOrdersModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
  },
  {
    path: 'follow-order',
    loadChildren: () => import('./follow-my-order/follow-my-order.module').then(m => m.FollowMyOrderModule)
  },
  {
    path: 'implicit/authcallback',
    loadChildren: () => import('./implicit/auth-callback/auth-callback.module').then(m => m.AuthCallbackPageModule)
  },
  {
    path: 'implicit/endsession',
    loadChildren: () => import('./implicit/end-session/end-session.module').then(m => m.EndSessionPageModule)
  },
  {
    path: 'tabs',
    component: TabComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'shopnearby',
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        // canActivate: [AuthGuardService]
      },
      {
        path: 'shoppinglist',
        loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule),
        canActivate: [AuthGuardService]
      },
    ]
  }
  // {
  //   path: 'home',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
