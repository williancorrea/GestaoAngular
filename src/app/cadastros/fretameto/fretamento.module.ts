import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {
    AutoCompleteModule,
    CalendarModule,
    DataTableModule,
    DialogModule,
    DropdownModule,
    InputMaskModule,
    InputTextareaModule,
    InputTextModule,
    KeyFilterModule,
    MessagesModule,
    ProgressBarModule, StepsModule,
    TooltipModule
} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from 'primeng/shared';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {TransportSharedModule} from '../../transport-shared/transport-share.module';
import {CoreModule} from '../../core/core.module';
import {NgxLoadingModule} from 'ngx-loading';
import {FretamentoEventualNovoComponent} from './fretamento-eventual-novo/fretamento-eventual-novo.component';

@NgModule({
    imports: [
        CommonModule,

        TranslateModule,
        TransportSharedModule,
        CoreModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgxLoadingModule,

        DataTableModule,
        SharedModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        MessageModule,
        MessagesModule,
        ButtonModule,
        PanelModule,
        TooltipModule,
        ProgressBarModule,
        InputTextareaModule,
        StepsModule,

        CalendarModule,
        KeyFilterModule,
        InputMaskModule,
        DialogModule,
        AutoCompleteModule
    ],
    declarations: [FretamentoEventualNovoComponent],
    providers: [
        TranslateService
    ]
})
export class FretamentoModule {
}
