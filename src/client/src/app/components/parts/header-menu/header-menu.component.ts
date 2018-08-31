/**
 * HeaderMenuComponent
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MocoinService } from '../../../services';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
    @Input() public isOpen: boolean;
    @Output() public close: EventEmitter<{}> = new EventEmitter();

    constructor(
        private modal: NgbModal,
        private mocoin: MocoinService
    ) { }

    public ngOnInit() {
    }

    public signOut() {
        this.close.emit();
        this.openConfirm({
            title: '確認',
            body: 'ログアウトしますか？',
            done: async () => {
                try {
                    await this.mocoin.signOut();
                } catch (err) {
                    console.error(err);
                }
            }

        });

    }

    private openConfirm(args: {
        title: string;
        body: string;
        done: Function
    }) {
        const modalRef = this.modal.open(ConfirmModalComponent, {
            centered: true
        });
        modalRef.result.then(async () => {
            await args.done();
        }).catch(() => {

        });

        modalRef.componentInstance.title = args.title;
        modalRef.componentInstance.body = args.body;
    }
}
