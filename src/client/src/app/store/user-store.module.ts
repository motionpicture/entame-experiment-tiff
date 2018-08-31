import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './effects';
import { userReducer } from './reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('User', userReducer),
        EffectsModule.forFeature([UserEffects])
    ]
})
export class UserStoreModule { }
