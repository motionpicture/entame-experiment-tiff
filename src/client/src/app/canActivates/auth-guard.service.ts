/**
 * AuthGuardService
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MocoinService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private mocoin: MocoinService
    ) { }

    /**
     * 認証
     * @method canActivate
     * @returns {Promise<boolean>}
     */
    public async canActivate(): Promise<boolean> {
        try {
            await this.mocoin.getServices();
            return true;
        } catch (err) {
            console.log('canActivate', err);
            this.router.navigate(['/auth']);

            return false;
        }
    }
}
