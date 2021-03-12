import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
    {
        path: '',
        component: HomePage
    },
    {
        path: 'shop/:id',
        loadChildren: () => import('./shop/shop.module').then(m => m.ShopPageModule)
    },
    {
        path: 'get-data/:id',
        loadChildren: () => import('./get-data/get-data.module').then( m => m.GetDataPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomePageRoutingModule { }