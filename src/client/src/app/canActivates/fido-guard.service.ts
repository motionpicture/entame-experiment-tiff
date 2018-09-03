/**
 * FidoGuardService
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FidoAction, NativeService } from '../services/native';

@Injectable({
    providedIn: 'root'
})
export class FidoGuardService implements CanActivate {

    constructor(
        private router: Router,
        private native: NativeService
    ) { }

    /**
     * 認証
     * @method canActivate
     * @returns {Promise<boolean>}
     */
    public async canActivate(): Promise<boolean> {
        try {
            const device = await this.native.device();
            if (device === null) {
                throw new Error('device is null');
            }
            const registerListResult = await this.native.fido({
                action: FidoAction.RegisterList,
                user: `${environment.APP_NAME}-${environment.ENV}-${device.uuid}`
            });

            if (!registerListResult.isSuccess) {
                throw new Error('registerList fail');
            }

            if (registerListResult.result.length === 0) {
                throw new Error('registerList not found');
            }

            return true;
        } catch (err) {
            console.log('canActivate', err);
            this.router.navigate(['/fido/register']);

            return false;
        }
    }
}
