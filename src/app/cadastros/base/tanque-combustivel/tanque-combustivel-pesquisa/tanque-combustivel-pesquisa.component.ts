import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationService, LazyLoadEvent, MessageService} from 'primeng/api';
import {TanqueCombustivelService} from '../tanqueCombustivel.service';
import {AuthService} from '../../../../security/auth.service';
import {ErroManipuladorService} from '../../../../core/erro-manipulador.service';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../../../environments/environment';
import {TanqueCombustivelFiltro} from '../tanqueCombustivelFiltro';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-combustivel-pesquisa',
    templateUrl: './tanque-combustivel-pesquisa.component.html',
    styleUrls: ['./tanque-combustivel-pesquisa.component.css']
})
export class TanqueCombustivelPesquisaComponent implements OnInit {

    listaObj = [];
    tanqueCombustivelFiltro: TanqueCombustivelFiltro;

    mostrarFiltros: boolean;
    objSelecionado = null;
    loading: boolean;
    totalRecords = 0;
    env: any;
    COLUNAS: any;

    traduzir: any;

    /*
     * Binds com os item da pagina html
     */
    @ViewChild('dataTable') grid;
    @ViewChild('globalFilter') filterGrid;


    constructor(private router: Router,
                private translate: TranslateService,
                private tanqueCombustivelService: TanqueCombustivelService,
                public auth: AuthService,
                private manipularErro: ErroManipuladorService,
                private toasty: MessageService,
                private confirmation: ConfirmationService,
                private title: Title) {
    }

    /**
     * Executar as informações assim que a página terminar de renderizar
     */
    ngOnInit() {
        this.mostrarFiltros = false;
        this.tanqueCombustivelFiltro = new TanqueCombustivelFiltro();

        this.env = environment;
        this.setLoading(true);
        this.translate.get('app').subscribe(s => {
            this.traduzir = s;
            this.title.setTitle(this.traduzir['tanque-combustivel']['lista']);

            this.COLUNAS = [
                {
                    field: 'key',
                    header: '',
                    hidden: true,
                    class: ''
                },
                {
                    field: 'nome',
                    header: this.traduzir['tanque-combustivel']['campos']['nome'],
                    hidden: false,
                    class: ''
                },
                {
                    field: 'inativo',
                    header: this.traduzir['tanque-combustivel']['campos']['inativo'],
                    hidden: false,
                    class: 'datatable-coluna-campo-codigo'
                }
            ];
        });
    }

    /**
     * Atribui o valor para ativar ou desativar o ícone mostradoTelaCarregando na tabela de dados
     */
    setLoading(loading) {
        this.loading = loading;
    }

    /**
     * Mostrar mais filtros com campos individuais
     */
    showFilterFields(value: boolean) {
        this.mostrarFiltros = value;
        this.tanqueCombustivelFiltro = new TanqueCombustivelFiltro();
        if (this.filterGrid) {
            this.filterGrid.nativeElement.value = '';
        }

    }

    /**
     * Filtrar por campos individuais
     */
    filterFields(dataTable) {
        this.setFilterDataTable(null, dataTable);
    }


    /**
     * Carregar Lazy loading de acordo com as informações passadas nos filtros
     */
    loadBank(lazyLoad: LazyLoadEvent) {
        this.setLoading(true);
        this.objSelecionado = null;
        this.tanqueCombustivelService.findAll(lazyLoad, this.tanqueCombustivelFiltro).then(result => {
            this.totalRecords = result.totalElements;
            this.listaObj = result.content;
            this.setLoading(false);
        })
            .catch(error => {
                this.setLoading(false);
                this.manipularErro.handle(error);
            });
    }

    /**
     * Recarrega todos os registros do DataTable
     */
    findAll(filtro, dataTable) {
        this.setLoading(true);
        if (filtro) {
            filtro.value = '';
        }

        this.grid.first = 0;

        this.showFilterFields(false);
        this.setFilterDataTable(filtro, dataTable);
    }

    /**
     * Atribui valores ao DataTable lazy-loading
     */
    setFilterDataTable(filtro, dataTable) {
        this.loadBank(
            {
                filters: dataTable.filters,
                first: 0,
                globalFilter: filtro && filtro.value ? filtro.value : '',
                multiSortMeta: dataTable.multiSortMeta,
                rows: dataTable.rows,
                sortField: dataTable.sortField,
                sortOrder: dataTable.sortOrder
            }
        );
    }

    /**
     * Redireciona você para a tela de edição de dados
     */
    editar() {
        this.router.navigateByUrl(this.traduzir['tanque-combustivel']['link-pagina'] + `/${this.objSelecionado.key}`);
    }

    /**
     * Abre o pop-up para confirmar a exclusão do registro
     */
    confirmarExclusao() {
        this.confirmation.confirm({
            message: this.traduzir['acoes']['confirmar-exclusao'],
            accept: () => {
                this.excluir();
            }
        });
    }

    /**
     * Exclui o registro selecionado
     */
    excluir() {
        this.loading = true;
        this.tanqueCombustivelService.delete(this.objSelecionado.key)
            .then(() => {
                this.grid.first = 0;
                this.findAll(this.filterGrid.nativeElement, this.grid);
                this.toasty.add({severity: 'success', detail: this.traduzir['tanque-combustivel']['excluir']});
                this.loading = false;
            })
            .catch(
                error => {
                    this.manipularErro.handle(error);
                    this.loading = false;
                }
            );
    }
}
