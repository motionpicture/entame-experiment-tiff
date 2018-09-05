import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../../environments/environment';
import { FidoAction, IDeviceResult, NativeService } from '../../../../services/native';
import { AlertModalComponent } from '../../../parts/alert-modal/alert-modal.component';

@Component({
    selector: 'app-fido-remove',
    templateUrl: './fido-remove.component.html',
    styleUrls: ['./fido-remove.component.scss']
})
export class FidoRemoveComponent implements OnInit {
    public isLoading: boolean;
    public isDisabled: boolean;
    public device: IDeviceResult;
    public alertModal: boolean;
    public registerList: any[];

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
            if (registerListResult.result.length === 0) {
                this.router.navigate(['/fido/register']);

                return;
            }
            this.registerList = registerListResult.result;
            this.isLoading = false;
        } catch (error) {
            this.router.navigate(['/error']);
        }
    }

    public async onSubmit() {
        this.isLoading = true;
        this.isDisabled = true;
        try {
            // const authenticationResult = await this.native.fido({
            //     action: FidoAction.Authentication,
            //     user: `${environment.APP_NAME}-${environment.ENV}-${this.device.uuid}`
            // });
            // if (!authenticationResult.isSuccess) {
            //     throw Error(authenticationResult.error);
            // }
            const removeResult = await this.native.fido({
                action: FidoAction.Remove,
                user: `${environment.APP_NAME}-${environment.ENV}-${this.device.uuid}`,
                handle: this.registerList[0].handle
            });
            if (!removeResult.isSuccess) {
                throw Error(removeResult.error);
            }
            this.router.navigate(['/fido/register']);
        } catch (error) {
            this.isLoading = false;
            this.isDisabled = false;
            this.openAlert({ title: 'エラー', body: error.message });
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
