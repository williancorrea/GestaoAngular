import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {SampleDemoComponent} from './demo/view/sampledemo.component';
import {FormsDemoComponent} from './demo/view/formsdemo.component';
import {DataDemoComponent} from './demo/view/datademo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MenusDemoComponent} from './demo/view/menusdemo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {UtilsDemoComponent} from './demo/view/utilsdemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {BancoNovoComponent} from './cadastros/base/banco/banco-novo/banco-novo.component';
import {AcessoNegadoComponent} from './core/acesso-negado.component';
import {PaginaNaoEncontradaComponent} from './core/pagina-nao-encontrada.component';
import {ErroComponent} from './core/erro.component';
import {LoginFormComponent} from './security/login-form/login-form.component';
import {AuthGuard} from './security/auth.guard';
import {BancoPesquisaComponent} from './cadastros/base/banco/banco-pesquisa/banco-pesquisa.component';
import {PermissoesDeAcessoComponent} from './cadastros/configuracao/permissoes-de-acesso/permissoes-de-acesso.component';
import {ControleKmPesquisaComponent} from './cadastros/controle-km/controle-km-pesquisa/controle-km-pesquisa.component';
import {VeiculoPesquisaComponent} from './cadastros/base/veiculo/veiculo-pesquisa/veiculo-pesquisa.component';
import {VeiculoNovoComponent} from './cadastros/base/veiculo/veiculo-novo/veiculo-novo.component';
import {ItinerarioPesquisaComponent} from './cadastros/base/itinerario/itinerario-pesquisa/itinerario-pesquisa.component';
import {ItinerarioNovoComponent} from './cadastros/base/itinerario/itinerario-novo/itinerario-novo.component';
import {CombustivelPesquisaComponent} from './cadastros/base/combustivel/combustivel-pesquisa/combustivel-pesquisa.component';
import {CombustivelNovoComponent} from './cadastros/base/combustivel/combustivel-novo/combustivel-novo.component';
import {TanqueCombustivelPesquisaComponent} from './cadastros/base/tanque-combustivel/tanque-combustivel-pesquisa/tanque-combustivel-pesquisa.component';
import {TanqueCombustivelNovoComponent} from './cadastros/base/tanque-combustivel/tanque-combustivel-novo/tanque-combustivel-novo.component';
import {UnidadeMedidaNovoComponent} from './cadastros/base/unidade-medida/unidade-medida-novo/unidade-medida-novo.component';
import {UnidadeMedidaPesquisaComponent} from './cadastros/base/unidade-medida/unidade-medida-pesquisa/unidade-medida-pesquisa.component';
import {PersonSearchComponent} from './cadastros/base/person/person-search/person-search.component';
import {PersonNewComponent} from './cadastros/base/person/person-new/person-new.component';
import {ControleKmNovoComponent} from './cadastros/controle-km/controle-km-novo/controle-km-novo.component';

export const routes: Routes = [
    {path: 'sample', component: SampleDemoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_DESENVOLVIMENTO']}},
    {path: 'forms', component: FormsDemoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_DESENVOLVIMENTO']}},
    {path: 'data', component: DataDemoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_DESENVOLVIMENTO']}},
    {path: 'panels', component: PanelsDemoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_DESENVOLVIMENTO']}},
    {path: 'overlays', component: OverlaysDemoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_DESENVOLVIMENTO']}},
    {path: 'menus', component: MenusDemoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_DESENVOLVIMENTO']}},
    {path: 'messages', component: MessagesDemoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_DESENVOLVIMENTO']}},
    {path: 'misc', component: MiscDemoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_DESENVOLVIMENTO']}},
    {path: 'empty', component: EmptyDemoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_DESENVOLVIMENTO']}},
    {path: 'charts', component: ChartsDemoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_DESENVOLVIMENTO']}},
    {path: 'file', component: FileDemoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_DESENVOLVIMENTO']}},
    {path: 'utils', component: UtilsDemoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_DESENVOLVIMENTO']}},
    {path: 'documentation', component: DocumentationComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_DESENVOLVIMENTO']}},


    // {path: 'cadastros/base/banco', loadChildren: './cadastros/base/banco/banco.module#BancoModule'},

    {path: 'cadastros/base/banco', component: BancoPesquisaComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LISTAR_BANCO']}},
    {path: 'cadastros/base/banco/novo', component: BancoNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SALVAR_BANCO']}},
    {path: 'cadastros/base/banco/:key', component: BancoNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ATUALIZAR_BANCO']}},

    {path: 'cadastros/configuracoes/permissoes-de-acesso', component: PermissoesDeAcessoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ALTERAR_PERMISSOES_ACESSO']}},

    {path: 'cadastros/controle-km', component: ControleKmPesquisaComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LISTAR_CONTROLE-KM']}},
    {path: 'cadastros/controle-km/novo', component: ControleKmNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SALVAR_CONTROLE-KM']}},
    {path: 'cadastros/controle-km/:key', component: ControleKmNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ATUALIZAR_CONTROLE-KM']}},

    {path: 'cadastros/base/veiculo', component: VeiculoPesquisaComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LISTAR_VEICULO']}},
    {path: 'cadastros/base/veiculo/novo', component: VeiculoNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SALVAR_VEICULO']}},
    {path: 'cadastros/base/veiculo/:key', component: VeiculoNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ATUALIZAR_VEICULO']}},

    {path: 'cadastros/base/itinerario', component: ItinerarioPesquisaComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LISTAR_ITINERARIO']}},
    {path: 'cadastros/base/itinerario/novo', component: ItinerarioNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SALVAR_ITINERARIO']}},
    {path: 'cadastros/base/itinerario/:key', component: ItinerarioNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ATUALIZAR_ITINERARIO']}},

    {path: 'cadastros/base/combustivel', component: CombustivelPesquisaComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LISTAR_COMBUSTIVEL']}},
    {path: 'cadastros/base/combustivel/novo', component: CombustivelNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SALVAR_COMBUSTIVEL']}},
    {path: 'cadastros/base/combustivel/:key', component: CombustivelNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ATUALIZAR_COMBUSTIVEL']}},

    {path: 'cadastros/base/tanque-combustivel', component: TanqueCombustivelPesquisaComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LISTAR_TANQUE-COMBUSTIVEL']}},
    {path: 'cadastros/base/tanque-combustivel/novo', component: TanqueCombustivelNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SALVAR_TANQUE-COMBUSTIVEL']}},
    {path: 'cadastros/base/tanque-combustivel/:key', component: TanqueCombustivelNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ATUALIZAR_TANQUE-COMBUSTIVEL']}},

    {path: 'cadastros/base/unidade-medida', component: UnidadeMedidaPesquisaComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LISTAR_UNIDADE-MEDIDA']}},
    {path: 'cadastros/base/unidade-medida/novo', component: UnidadeMedidaNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SALVAR_UNIDADE-MEDIDA']}},
    {path: 'cadastros/base/unidade-medida/:key', component: UnidadeMedidaNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ATUALIZAR_UNIDADE-MEDIDA']}},

    // {path: 'cadastros/base/classe-despesa', component: ClasseDespesaPesquisarComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LISTAR_CLASSE-DESPESA']}},
    // {path: 'cadastros/base/classe-despesa/novo', component: ClasseDespesaNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SALVAR_CLASSE-DESPESA']}},
    // {path: 'cadastros/base/classe-despesa/:key', component: ClasseDespesaNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ATUALIZAR_CLASSE-DESPESA']}},

    // {path: 'types-of-relationships', component: TypeRelationshipSearchComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LIST_TYPE-RELATIONSHIP']}},
    // {path: 'types-of-relationships/new', component: TypeRelationshipNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SAVE_TYPE-RELATIONSHIP']}},
    // {path: 'types-of-relationships/:key', component: TypeRelationshipNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_UPDATE_TYPE-RELATIONSHIP']}},

    // {path: 'levels-of-education', component: LevelOfEducationSearchComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LIST_LEVEL-OF-EDUCATION']}},
    // {path: 'levels-of-education/new', component: LevelOfEducationNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SAVE_LEVEL-OF-EDUCATION']}},
    // {path: 'levels-of-education/:key', component: LevelOfEducationNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_UPDATE_LEVEL-OF-EDUCATION']}},

    // {path: 'estado-civil', component: EstadoCivilPesquisarComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LISTAR_ESTADO_CIVIL']}},
    // {path: 'estado-civil/novo', component: EstadoCivilNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SALVAR_ESTADO_CIVIL']}},
    // {path: 'estado-civil/:key', component: EstadoCivilNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ATUALIZAR_ESTADO_CIVIL']}},



    {path: 'cadastros/base/pessoas', component: PersonSearchComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LIST_PERSON']}},
    {path: 'cadastros/base/pessoas/novo', component: PersonNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SAVE_PERSON']}},
    {path: 'cadastros/base/pessoas/:key', component: PersonNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_UPDATE_PERSON']}},


    // {path: 'centroDeCusto', component: CentroDeCustoPesquisarComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LISTAR_CENTRO-DE-CUSTO']}},
    // {path: 'centroDeCusto/novo', component: CentroDeCustoNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SALVAR_CENTRO-DE-CUSTO']}},
    // {path: 'centroDeCusto/:key', component: CentroDeCustoNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ATUALIZAR_CENTRO-DE-CUSTO']}},

    // {path: 'tipoPagamento', component: TipoPagamentoPesquisarComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LISTAR_TIPO-PAGAMENTO']}},
    // {path: 'tipoPagamento/novo', component: TipoPagamentoNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SALVAR_TIPO-PAGAMENTO']}},
    // {path: 'tipoPagamento/:key', component: TipoPagamentoNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ATUALIZAR_TIPO-PAGAMENTO']}},

    {
        path: '',
        component: DashboardDemoComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
        data: {
            roles: [
                'ROLE_CMB-PADRAO'
            ]
        }
    },

    {path: 'acesso-negado', component: AcessoNegadoComponent},
    {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
    {path: 'erro', component: ErroComponent},
    {path: 'login', component: LoginFormComponent},

    {path: '**', redirectTo: 'pagina-nao-encontrada'}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
