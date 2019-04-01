import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DataTableModule, DropdownModule, InputTextareaModule, InputTextModule, ProgressBarModule, TooltipModule} from 'primeng/primeng';
import {MessageModule} from 'primeng/message';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {SharedModule} from 'primeng/shared';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {TransportSharedModule} from '../../../transport-shared/transport-share.module';
import {CoreModule} from '../../../core/core.module';
import {NgxLoadingModule} from 'ngx-loading';

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
        ButtonModule,
        PanelModule,
        TooltipModule,
        ProgressBarModule,
        InputTextareaModule
    ],
    declarations: [],
    exports: [],
    providers: [
        TranslateService
    ]
})
export class TypeRelationshipModule {
}
