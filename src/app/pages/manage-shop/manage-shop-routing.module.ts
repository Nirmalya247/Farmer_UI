import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageShopPage } from './manage-shop.page';

const routes: Routes = [
    {
        path: '',
        component: ManageShopPage
    },
    {
        path: 'shop/:id',
        loadChildren: () => import('./shop/shop.module').then(m => m.ShopPageModule)
    },
    {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManageShopPageRoutingModule { }