/**
 * ルーティング
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, FidoGuardService } from '../canActivates';
import { BaseComponent } from '../components/pages/base/base.component';
import { ErrorComponent } from '../components/pages/error/error.component';
import { GoodsCompleteComponent } from '../components/pages/goods/goods-complete/goods-complete.component';
import { GoodsConfirmComponent } from '../components/pages/goods/goods-confirm/goods-confirm.component';
import { GoodsQrcodeComponent } from '../components/pages/goods/goods-qrcode/goods-qrcode.component';
import { HistoryDetailsComponent } from '../components/pages/history/history-details/history-details.component';
import { HistoryListComponent } from '../components/pages/history/history-list/history-list.component';
import { IndexComponent } from '../components/pages/index/index.component';
import { NotfoundComponent } from '../components/pages/notfound/notfound.component';
import { TicketCompleteComponent } from '../components/pages/ticket/ticket-complete/ticket-complete.component';
import { TicketConfirmComponent } from '../components/pages/ticket/ticket-confirm/ticket-confirm.component';
import * as auth from '../routes/auth.route';
import * as fido from '../routes/fido.route';

const appRoutes: Routes = [
    { path: '', redirectTo: '/index', pathMatch: 'full' },
    auth.route,
    fido.route,
    {
        path: '',
        component: BaseComponent,
        canActivate: [AuthGuardService, FidoGuardService],
        children: [
            { path: 'index', component: IndexComponent },
            {
                path: 'ticket', children: [
                    { path: '', redirectTo: '/ticket/confirm', pathMatch: 'full' },
                    { path: 'confirm', component: TicketConfirmComponent },
                    { path: 'complete', component: TicketCompleteComponent }
                ]
            },
            {
                path: 'goods', children: [
                    { path: '', redirectTo: '/goods/qrcode', pathMatch: 'full' },
                    { path: 'qrcode', component: GoodsQrcodeComponent },
                    { path: 'confirm', component: GoodsConfirmComponent },
                    { path: 'complete', component: GoodsCompleteComponent }
                ]
            },
            {
                path: 'history', children: [
                    { path: '', redirectTo: '/history/list', pathMatch: 'full' },
                    { path: 'list', component: HistoryListComponent },
                    { path: 'details', component: HistoryDetailsComponent }
                ]
            },
        ]
    },
    {
        path: '',
        component: BaseComponent,
        children: [
            { path: 'error', component: ErrorComponent },
            { path: '**', component: NotfoundComponent }
        ]
    }
];

// tslint:disable-next-line:no-stateless-class
@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { useHash: true, enableTracing: true }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
