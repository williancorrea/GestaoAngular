import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ControleKmService} from '../controle-km.service';
import {ConfirmationService, LazyLoadEvent, MessageService} from 'primeng/api';
import {Router} from '@angular/router';

import {FormBuilder} from '@angular/forms';
import {ControleKmFiltro} from '../ControleKmFiltro';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../../security/auth.service';
import {ErroManipuladorService} from '../../../core/erro-manipulador.service';
import {environment} from '../../../../environments/environment';
import {VeiculoService} from '../../base/veiculo/veiculo.service';
import {ItinerarioService} from '../../base/itinerario/itinerario.service';
import {PersonService} from '../../base/person/person.service';

@Component({
    selector: 'app-controle-km-pesquisa',
    templateUrl: './controle-km-pesquisa.component.html',
    styleUrls: ['./controle-km-pesquisa.component.css']
})
export class ControleKmPesquisaComponent implements OnInit {

    controleKmList = [];
    controleKmFiltro: ControleKmFiltro;
    controleKmSelecionado = null;
    mostarFiltros: boolean;
    loading: boolean;
    mostrarJanelaEdicao: boolean;
    totalRegistros = 0;

    veiculoList: any;
    itinerarioList: any;
    pessoaList: any;

    variaveisAmbiente: any;
    COLUNAS: any;

    traduzir: any;

    /*
     * Binds com itens da pagina HTML
     */
    @ViewChild('dataTable') tabelaBind;
    @ViewChild('globalFilter') filtroGlobalBind;
    @ViewChild('f') formBind;


    constructor(private router: Router,
                private translate: TranslateService,
                private controleKmService: ControleKmService,
                public auth: AuthService,
                private manipuladorErros: ErroManipuladorService,
                private toasty: MessageService,
                private confirmacao: ConfirmationService,
                private veiculoService: VeiculoService,
                private itinerarioService: ItinerarioService,
                private pessoaService: PersonService,
                private titulo: Title,
                private formBuild: FormBuilder) {
    }

    /**
     * Executar as informações assim que a página terminar de renderizar
     */
    ngOnInit() {
        this.mostarFiltros = false;
        this.mostrarJanelaEdicao = false;

        this.controleKmFiltro = new ControleKmFiltro();

        this.variaveisAmbiente = environment;

        this.setMostrarTelaCarregando(true);
        this.translate.get('app').subscribe(s => {
            this.traduzir = s;
            this.titulo.setTitle(this.traduzir['controleKm']['lista']);

            this.COLUNAS = [
                {field: 'key', header: '', hidden: true, class: ''},
                // {
                //     field: 'dataHoraSaida',
                //     header: this.traduzir['controleKm']['campos']['dataHoraSaida'],
                //     hidden: false,
                //     class: 'datatable-coluna_data',
                //     sort: true
                // },
                // {
                //     field: 'dataHoraChegada',
                //     header: this.traduzir['controleKm']['campos']['dataHoraChegada'],
                //     hidden: false,
                //     class: 'datatable-coluna_data',
                //     sort: true
                // },
                {field: 'kmSaida', header: this.traduzir['controleKm']['campos']['kmSaida'], hidden: false, class: 'datatable-coluna_km', sort: true},
                {
                    field: 'kmChegada',
                    header: this.traduzir['controleKm']['campos']['kmChegada'],
                    hidden: false,
                    class: 'datatable-coluna_km',
                    sort: true
                },
                {
                    field: 'kmTotal',
                    header: this.traduzir['controleKm']['campos']['kmTotal'],
                    hidden: false,
                    class: 'datatable-coluna_total',
                    sort: false
                },
                // {
                //     field: 'kmNaoInformado',
                //     header: this.traduzir['controleKm']['campos']['kmNaoInformado2'],
                //     hidden: false,
                //     class: 'datatable-coluna_km_nao_informado',
                //     sort: false
                // }
                // {field: 'veiculo.placa', header: s['campos']['veiculo'], hidden: false, class: ''}
                // {field: 'codigo', header: s['campos']['codigo'], hidden: false, class: 'datatable-collum-field-name'},
                // {field: 'pessoa', header: s['campos']['motorista'], hidden: false, class: ''},
                // {field: 'veiculo', header: s['campos']['veiculo'], hidden: false, class: ''},
                // {field: 'validoAte', header: s['campos']['validoAte'], hidden: false, class: 'datatable-collum-field-name'}
            ];
        });

        this.carregarVeiculos();
        this.carregarItinerarios();
        this.carregarMotoristas();
    }

    // TODO: VERIFICAR A PESQUISA POR PLACA E FROTA
    carregarVeiculos() {
        this.veiculoService.findAll({'rows': 100, 'first': 0, 'sortOrder': 1, 'sortField': 'frota'}, null)
            .then(veiculoList => {
                this.veiculoList = veiculoList.content.map(p => ({label: p.frota + ' - ' + p.placa, value: p.key}));
            })
            .catch(error => {
                this.manipuladorErros.handle(error);
            });
    }

    // TODO: VERIFICAR A PESQUISA POR NOME
    carregarItinerarios() {
        this.itinerarioService.findAll({'rows': 100, 'first': 0, 'sortOrder': 1, 'sortField': 'nome'}, null)
            .then(veiculoList => {
                this.itinerarioList = veiculoList.content.map(p => ({label: p.nome, value: p.key}));
            })
            .catch(error => {
                this.manipuladorErros.handle(error);
            });
    }

    // TODO: BUSCAR SOMENTE OS MOTORISTAS E COLABORADORES
    carregarMotoristas() {
        this.pessoaService.findAll({'rows': 100, 'first': 0, 'sortOrder': 1, 'sortField': 'nome'}, null)
            .then(veiculoList => {
                this.pessoaList = veiculoList.content.map(p => ({label: p.pessoaFisica.apelido ? p.nome + ' (' + p.pessoaFisica.apelido + ')' : p.nome, value: p.key}));
            })
            .catch(error => {
                this.manipuladorErros.handle(error);
            });
    }

    /**
     * Apresenta ou esconde a tela de carregando
     */
    setMostrarTelaCarregando(carregando) {
        this.loading = carregando;
    }

    /**
     * Mostra mais filtros com campos individuais
     */
    mostrarCamposFiltros(value: boolean) {
        this.mostarFiltros = value;
        this.controleKmFiltro = new ControleKmFiltro();
        if (this.filtroGlobalBind) {
            this.filtroGlobalBind.nativeElement.value = '';
        }

    }

    /**
     * Filtrar por campos individuais
     */
    filterFields(dataTable) {
        this.setFilterDataTable(null, dataTable);
    }

    /**
     * Carregamento preguicoso de acordo com as informações passadas nos filtro
     */
    loadBank(lazyLoad: LazyLoadEvent) {
        this.setMostrarTelaCarregando(true);
        this.controleKmSelecionado = null;
        lazyLoad.globalFilter = this.filtroGlobalBind.nativeElement.value ? this.filtroGlobalBind.nativeElement.value : '';
        this.controleKmService.findAll(lazyLoad, this.controleKmFiltro).then(result => {
            this.totalRegistros = result.totalElements;
            this.controleKmList = result.content;
            this.setMostrarTelaCarregando(false);
        })
            .catch(error => {
                this.manipuladorErros.handle(error);
            });
    }

    /**
     * Recarrega todos os registros da tabelaBind
     */
    buscarTodos(filtro, dataTable) {
        this.setMostrarTelaCarregando(true);
        if (filtro) {
            filtro.value = '';
        }

        this.tabelaBind.first = 0;

        this.mostrarCamposFiltros(false);

        this.setFilterDataTable(filtro, dataTable);
    }

    /**
     * Atribui valores e filtros a Tabela
     */
    setFilterDataTable(filter, dataTable) {
        this.loadBank(
            {
                filters: dataTable.filters,
                first: 0,
                globalFilter: filter && filter.value ? filter.value : '',
                multiSortMeta: dataTable.multiSortMeta,
                rows: dataTable.rows,
                sortField: dataTable.sortField,
                sortOrder: dataTable.sortOrder
            }
        );
    }


    /**
     * Abre um popup para confirmar a exclusão de um registro
     */
    confirmarExclusao() {
        this.confirmacao.confirm({
            message: this.traduzir['acoes']['confirmar-exclusao'],
            accept: () => {
                this.excluir();
            }
        });
    }

    /**
     * Deleta o registro selecionado
     */
    excluir() {
        this.setMostrarTelaCarregando(true);

        this.controleKmService.delete(this.controleKmSelecionado.key)
            .then(() => {
                this.tabelaBind.first = 0;
                this.buscarTodos(this.filtroGlobalBind.nativeElement, this.tabelaBind);
                this.setMostrarTelaCarregando(false);
                this.toasty.add({severity: 'success', detail: this.traduzir['controleKm']['acoes']['deletar_sucesso']});
            })
            .catch(
                error => {
                    this.setMostrarTelaCarregando(false);
                    this.manipuladorErros.handle(error);
                });
    }


    /**
     * Redireciona para a tela de edicao de dados
     */
    edit() {
        this.router.navigateByUrl(this.traduzir['controleKm']['link-pagina'] + `/${this.controleKmSelecionado.key}`);
    }

}
