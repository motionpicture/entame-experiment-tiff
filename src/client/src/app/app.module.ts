/**
 * NgModule
 */

// tslint:disable:no-submodule-imports max-line-length
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './components/app/app.component';
import { AuthIndexComponent } from './components/pages/auth/auth-index/auth-index.component';
import { AuthSigninComponent } from './components/pages/auth/auth-signin/auth-signin.component';
import { AuthSignoutComponent } from './components/pages/auth/auth-signout/auth-signout.component';
import { BaseComponent } from './components/pages/base/base.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { GoodsCompleteComponent } from './components/pages/goods/goods-complete/goods-complete.component';
import { GoodsConfirmComponent } from './components/pages/goods/goods-confirm/goods-confirm.component';
import { GoodsQrcodeComponent } from './components/pages/goods/goods-qrcode/goods-qrcode.component';
import { HistoryDetailsComponent } from './components/pages/history/history-details/history-details.component';
import { HistoryListComponent } from './components/pages/history/history-list/history-list.component';
import { IndexComponent } from './components/pages/index/index.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { TicketCompleteComponent } from './components/pages/ticket/ticket-complete/ticket-complete.component';
import { TicketConfirmComponent } from './components/pages/ticket/ticket-confirm/ticket-confirm.component';
import { AlertModalComponent } from './components/parts/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './components/parts/confirm-modal/confirm-modal.component';
import { ContentsComponent } from './components/parts/contents/contents.component';
import { FooterComponent } from './components/parts/footer/footer.component';
import { HeaderMenuComponent } from './components/parts/header-menu/header-menu.component';
import { HeaderComponent } from './components/parts/header/header.component';
import { LoadingComponent } from './components/parts/loading/loading.component';
import { NavigationComponent } from './components/parts/navigation/navigation.component';
import {
    AppRoutingModule,
    PurchaseModule,
    UserModule
} from './modules';
import { CoreStoreModule } from './store/core/store';

// tslint:disable-next-line:no-stateless-class
@NgModule({
    declarations: [
        AppComponent,
        AuthSigninComponent,
        AuthSignoutComponent,
        NotfoundComponent,
        AuthIndexComponent,
        ContentsComponent,
        HeaderComponent,
        FooterComponent,
        AlertModalComponent,
        LoadingComponent,
        ErrorComponent,
        BaseComponent,
        HeaderMenuComponent,
        ConfirmModalComponent,
        IndexComponent,
        NavigationComponent,
        GoodsConfirmComponent,
        GoodsCompleteComponent,
        GoodsQrcodeComponent,
        TicketCompleteComponent,
        TicketConfirmComponent,
        HistoryListComponent,
        HistoryDetailsComponent
    ],
    entryComponents: [
        AlertModalComponent,
        ConfirmModalComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        UserModule,
        PurchaseModule,
        CoreStoreModule,
        NgbModule.forRoot()
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
