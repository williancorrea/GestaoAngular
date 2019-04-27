import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationService, LazyLoadEvent, MessageService} from 'primeng/api';
import {Title} from '@angular/platform-browser';
import {PersonService} from '../person.service';
import {environment} from '../../../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../../../security/auth.service';
import {ErroManipuladorService} from '../../../../core/erro-manipulador.service';
import {PersonFilters} from '../PersonFilters';

@Component({
    selector: 'app-person-search',
    templateUrl: './person-search.component.html',
    styleUrls: ['./person-search.component.css']
})
export class PersonSearchComponent implements OnInit {

    persons = [];
    personFilters: PersonFilters;
    showFilter: boolean;
    selectedPerson = null;
    loading: boolean;
    totalRecords = 0;
    env: any;
    COLS: any;
    traduzir: any;

    /*
     * Binds with items on html page
     */
    @ViewChild('dataTable') grid;
    @ViewChild('globalFilter') filterGrid;


    constructor(private router: Router,
                private translate: TranslateService,
                private personService: PersonService,
                public auth: AuthService,
                private errorHandler: ErroManipuladorService,
                private toasty: MessageService,
                private confirmation: ConfirmationService,
                private title: Title) {
    }

    ngOnInit() {
        this.showFilter = false;
        this.personFilters = new PersonFilters();

        this.env = environment;
        this.setLoading(true);
        this.translate.get('app').subscribe(s => {
            this.traduzir = s;

            this.title.setTitle(this.traduzir['pessoa']['titulo']);

            this.COLS = [
                {
                    field: 'key',
                    header: '',
                    hidden: true,
                    class: ''
                },
                {
                    field: 'nome',
                    header: this.traduzir['pessoa']['campos']['nome'],
                    hidden: false,
                    class: ''
                },
                {
                    field: 'cliente',
                    header: this.traduzir['pessoa']['campos']['cliente'],
                    hidden: false,
                    class: 'datatable-collum-field-boolean'
                },
                {
                    field: 'estudante',
                    header: this.traduzir['pessoa']['campos']['estudante'],
                    hidden: false,
                    class: 'datatable-collum-field-boolean'
                },
                {
                    field: 'fornecedor',
                    header: this.traduzir['pessoa']['campos']['fornecedor'],
                    hidden: false,
                    class: 'datatable-collum-field-boolean'
                },
                {
                    field: 'colaborador',
                    header: this.traduzir['pessoa']['campos']['colaborador'],
                    hidden: false,
                    class: 'datatable-collum-field-boolean'
                },
                {
                    field: 'transportadora',
                    header: this.traduzir['pessoa']['campos']['transportadora'],
                    hidden: false,
                    class: 'datatable-collum-field-boolean'
                },
                {
                    field: 'inativo',
                    header: this.traduzir['pessoa']['campos']['inativo'],
                    hidden: true,
                    class: 'datatable-collum-field-boolean'
                }

            ];
        });
    }

    setLoading(loading) {
        this.loading = loading;
    }

    showFilterFields(value: boolean) {
        this.showFilter = value;
        this.personFilters = new PersonFilters();
        if (this.filterGrid) {
            this.filterGrid.nativeElement.value = '';
        }

    }

    filterFields(dataTable) {
        this.setFilterDataTable(null, dataTable);
    }

    loadBank(lazyLoad: LazyLoadEvent) {
        this.setLoading(true);
        this.selectedPerson = null;
        lazyLoad.globalFilter = this.filterGrid.nativeElement.value ? this.filterGrid.nativeElement.value : '';

        this.personService.findAll(lazyLoad, this.personFilters).then(result => {
            this.totalRecords = result.totalElements;
            this.persons = result.content;
            this.setLoading(false);
        })
            .catch(error => {
                this.setLoading(false);
                this.errorHandler.handle(error);
            });
    }

    findAll(filter, dataTable) {
        this.setLoading(true);
        if (filter) {
            filter.value = '';
        }

        this.grid.first = 0;

        this.showFilterFields(false);
        this.setFilterDataTable(filter, dataTable);
    }

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

    edit() {
        this.router.navigateByUrl(`${this.translate['pessoa'['link-pagina']]}/${this.selectedPerson.key}`);
    }

    ConfirmDeletion() {
        this.traduzir.get('actions').subscribe(s => {
            this.confirmation.confirm({
                message: s['confirm-deletion'],
                accept: () => {
                    this.delete();
                }
            });
        });
    }

    delete() {
        this.setLoading(true);
        this.personService.delete(this.selectedPerson.key)
            .then(() => {
                this.grid.first = 0;
                this.findAll(this.filterGrid.nativeElement, this.grid);
                this.toasty.add({severity: 'success', detail: this.traduzir['pessoa']['acoes']['excluir']});
                this.setLoading(false);
            })
            .catch(
                error => {
                    this.errorHandler.handle(error);
                    this.setLoading(false);
                }
            );
    }

}
