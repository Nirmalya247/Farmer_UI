import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'manage-shop',
    loadChildren: () => import('./pages/manage-shop/manage-shop.module').then( m => m.ManageShopPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'admin-sell-requests',
    loadChildren: () => import('./pages/admin-sell-requests/admin-sell-requests.module').then( m => m.AdminSellRequestsPageModule)
  },
  {
    path: 'my-sell-requests',
    loadChildren: () => import('./pages/my-sell-requests/my-sell-requests.module').then( m => m.MySellRequestsPageModule)
  },
  {
    path: 'language',
    loadChildren: () => import('./pages/language/language.module').then( m => m.LanguagePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
