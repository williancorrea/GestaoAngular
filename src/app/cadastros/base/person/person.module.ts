import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    CalendarModule,
    CheckboxModule,
    DataTableModule,
    DropdownModule,
    FieldsetModule,
    InputMaskModule,
    InputTextModule,
    KeyFilterModule,
    ProgressBarModule,
    RadioButtonModule,
    TabViewModule,
    TooltipModule
} from 'primeng/primeng';
import {MessageModule} from 'primeng/message';
import {SharedModule} from 'primeng/shared';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {RouterModule} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {TransportSharedModule} from '../../../transport-shared/transport-share.module';
import {CoreModule} from '../../../core/core.module';
import {NgxLoadingModule} from 'ngx-loading';
import {PersonNewComponent} from './person-new/person-new.component';
import {PersonSearchComponent} from './person-search/person-search.component';

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
        CheckboxModule,
        RadioButtonModule,
        CalendarModule,
        KeyFilterModule,
        FieldsetModule,
        InputMaskModule,
        TabViewModule
    ],
    declarations: [
        PersonNewComponent,
        PersonSearchComponent
    ],
    exports: [],
    providers: [
        TranslateService
    ]
})
export class PersonModule {
}
