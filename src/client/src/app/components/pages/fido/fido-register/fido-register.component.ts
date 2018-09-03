import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../../environments/environment';
import { FidoAction, IDeviceResult, NativeService } from '../../../../services/native';
import { AlertModalComponent } from '../../../parts/alert-modal/alert-modal.component';

@Component({
    selector: 'app-fido-register',
    templateUrl: './fido-register.component.html',
    styleUrls: ['./fido-register.component.scss']
})
export class FidoRegisterComponent implements OnInit {
    public device: IDeviceResult;
    public isDisabled: boolean;
    public isLoading: boolean;

    constructor(
        private native: NativeService,
        private router: Router,
        private modal: NgbModal
    ) { }

    public async ngOnInit() {
        this.isLoading = true;
        try {
            const device = await this.native.device();
            if (device === null) {
                throw new Error('device is null');
            }
            this.device = device;
            const registerListResult = await this.native.fido({
                action: FidoAction.RegisterList,
                user: `${environment.APP_NAME}-${environment.ENV}-${this.device.uuid}`
            });
            if (!registerListResult.isSuccess) {
                throw new Error('registerList fail');
            }
            if (registerListResult.result.length > 0) {
                this.router.navigate(['/']);

                return;
            }
            this.isLoading = false;
        } catch (err) {
            this.router.navigate(['/error']);
        }
    }

    public async onSubmit() {
        this.isLoading = true;
        this.isDisabled = true;
        try {
            const registerResult = await this.native.fido({
                action: FidoAction.Register,
                user: `${environment.APP_NAME}-${environment.ENV}-${this.device.uuid}`
            });
            if (!registerResult.isSuccess) {
                throw Error(registerResult.error);
            }
            this.router.navigate(['/']);
        } catch (error) {
            this.isLoading = false;
            this.isDisabled = false;
            this.openAlert({
                title: 'エラー',
                body: error.message
            });
        }
    }

    private openAlert(args: {
        title: string;
        body: string;
    }) {
        const modalRef = this.modal.open(AlertModalComponent, {
            centered: true
        });
        modalRef.componentInstance.title = args.title;
        modalRef.componentInstance.body = args.body;
    }

}
