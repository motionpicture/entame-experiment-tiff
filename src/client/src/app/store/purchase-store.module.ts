import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PurchaseEffects } from './effects';
import { purchaseReducer } from './reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('Purchase', purchaseReducer),
        EffectsModule.forFeature([PurchaseEffects])
    ]
})
export class PurchaseStoreModule { }
