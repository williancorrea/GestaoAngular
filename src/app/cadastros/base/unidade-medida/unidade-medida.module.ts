import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelModule} from 'primeng/panel';
import {CheckboxModule, DataTableModule, DropdownModule, InputTextModule, ProgressBarModule, TooltipModule} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageModule} from 'primeng/message';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {SharedModule} from 'primeng/shared';
import {RouterModule} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {TransportSharedModule} from '../../../transport-shared/transport-share.module';
import {CoreModule} from '../../../core/core.module';
import {NgxLoadingModule} from 'ngx-loading';
import {UnidadeMedidaNovoComponent} from './unidade-medida-novo/unidade-medida-novo.component';
import {UnidadeMedidaPesquisaComponent} from './unidade-medida-pesquisa/unidade-medida-pesquisa.component';

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
        CheckboxModule
    ],
    declarations: [
        UnidadeMedidaNovoComponent,
        UnidadeMedidaPesquisaComponent
    ],
    exports: [],
    providers: [
        TranslateService
    ]
})
export class UnidadeMedidaModule {
}
