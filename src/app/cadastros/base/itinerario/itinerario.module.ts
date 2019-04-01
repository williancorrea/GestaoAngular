import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from 'primeng/shared';
import {RouterModule} from '@angular/router';
import {
    CalendarModule,
    CheckboxModule,
    DataTableModule,
    DropdownModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextareaModule,
    InputTextModule,
    KeyFilterModule,
    ProgressBarModule,
    TooltipModule
} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {MessageModule} from 'primeng/message';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {TransportSharedModule} from '../../../transport-shared/transport-share.module';
import {CoreModule} from '../../../core/core.module';
import {NgxLoadingModule} from 'ngx-loading';
import {ItinerarioPesquisaComponent} from './itinerario-pesquisa/itinerario-pesquisa.component';
import {ItinerarioNovoComponent} from './itinerario-novo/itinerario-novo.component';

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
        InputTextareaModule,

        CalendarModule,
        KeyFilterModule,
        InputMaskModule,
        InputSwitchModule,
        CheckboxModule
    ],
    declarations: [
        ItinerarioPesquisaComponent, ItinerarioNovoComponent
    ],
    providers: [
        TranslateService
    ]
})
export class ItinerarioModule {
}
