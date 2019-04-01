import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PanelModule} from 'primeng/panel';
import {DataTableModule, DropdownModule, InputTextareaModule, InputTextModule, ProgressBarModule, TooltipModule} from 'primeng/primeng';
import {MessageModule} from 'primeng/message';
import {ButtonModule} from 'primeng/button';
import {SharedModule} from 'primeng/shared';
import {RouterModule} from '@angular/router';
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
export class LevelOfEducationModule {
}
