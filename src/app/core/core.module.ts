import {Title} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConfirmationService, MessageService} from 'primeng/components/common/api';
import {ConfirmDialogModule} from 'primeng/components/confirmdialog/confirmdialog';

import {ErroManipuladorService} from './erro-manipulador.service';
import {AcessoNegadoComponent} from './acesso-negado.component';
import {PaginaNaoEncontradaComponent} from './pagina-nao-encontrada.component';
import {ButtonModule} from 'primeng/button';
import {ErroComponent} from './erro.component';
import {TranslateModule} from '@ngx-translate/core';
import {ToastModule} from 'primeng/toast';
import {AuthService} from '../security/auth.service';
import {JwtHelper} from 'angular2-jwt';
import {BancoService} from '../cadastros/base/banco/banco.service';
import {ControleKmService} from '../cadastros/controle-km/controle-km.service';
import {CentroDeCustoService} from '../cadastros/base/centro-de-custo/centro-de-custo.service';
import {ClasseDespesaService} from '../cadastros/base/classe-despesa/classe-despesa.service';
import {EstadoCivilService} from '../cadastros/base/estado-civil/estado-civil.service';
import {ItinerarioService} from '../cadastros/base/itinerario/itinerario.service';
import {LevelOfEducationService} from '../cadastros/base/level-of-education/level-of-education.service';
import {PersonService} from '../cadastros/base/person/person.service';
import {ProductUnitService} from '../cadastros/base/product-unit/product-unit.service';
import {TipoPagamentoService} from '../cadastros/base/tipo-pagamento/tipo-pagamento.service';
import {TypeRelationshipService} from '../cadastros/base/type-relationship/type-relationship.service';
import {VeiculoService} from '../cadastros/base/veiculo/veiculo.service';


@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule,
        TranslateModule,
        ButtonModule,

        ConfirmDialogModule,
        ToastModule
    ],
    declarations: [
        PaginaNaoEncontradaComponent,
        AcessoNegadoComponent,
        ErroComponent
    ],
    exports: [
        ToastModule,
        ConfirmDialogModule
    ],
    providers: [
        ErroManipuladorService,
        AuthService,

        ConfirmationService,
        MessageService,

        JwtHelper,
        Title,
        {provide: LOCALE_ID, useValue: 'pt-BR'},

        BancoService,
        CentroDeCustoService,
        ClasseDespesaService,
        EstadoCivilService,
        ItinerarioService,
        LevelOfEducationService,
        PersonService,
        ProductUnitService,
        TipoPagamentoService,
        TypeRelationshipService,
        VeiculoService,
        ControleKmService,
    ]
})
export class CoreModule {
}
