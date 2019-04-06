import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ErroManipuladorService} from '../../../../core/erro-manipulador.service';
import {AuthService} from '../../../../security/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseFormComponent} from '../../../../transport-shared/base-form/base-form.component';
import {TranslateService} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {TanqueCombustivelService} from '../tanqueCombustivel.service';
import {CombustivelService} from '../../combustivel/combustivel.service';

@Component({
    selector: 'app-combustivel-new',
    templateUrl: './tanque-combustivel-novo.component.html',
    styleUrls: ['./tanque-combustivel-novo.component.css']
})
export class TanqueCombustivelNovoComponent extends BaseFormComponent implements OnInit {

    traduzir: any;
    combustivelList: any;
    combustivelSugestaoList: any[];

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private translateService: TranslateService,
                private titulo: Title,
                private tanqueCombustivelService: TanqueCombustivelService,
                private combustivelService: CombustivelService,
                private toasty: MessageService,
                public auth: AuthService,
                private errorHandler: ErroManipuladorService,
                private formBuild: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.configurarForm();
        this.mostrarModalCarregando(true);
        this.translateService.get('app').subscribe(s => {
            this.traduzir = s;

            const editando = this.activatedRoute.snapshot.params['key'];

            this.carregarCombustivel();

            if (editando) {
                this.titulo.setTitle(this.traduzir['tanque-combustivel']['acoes']['editar']);

                this.tanqueCombustivelService.findOne(editando).then(response => {
                    this.form.patchValue(response);
                    this.mostrarModalCarregando(false);
                }).catch(error => {
                    this.errorHandler.handle(error);
                    this.titulo.setTitle(this.traduzir['tanque-combustivel']['acoes']['adicionar']);
                    this.mostrarModalCarregando(false);
                });
            } else {
                this.titulo.setTitle(this.traduzir['tanque-combustivel']['acoes']['adicionar']);
                this.mostrarModalCarregando(false);
            }
        });
    }

    // TODO: MELHORAR O CARREGAMENTO DESTA PESQUIA
    carregarCombustivel() {
        this.combustivelService.findAllCmb(0, 1000).then(lista => {
            this.combustivelList = lista.content.map(p => ({
                label: p.combustivel.nome,
                value: p.combustivel.key
            }));
        })
            .catch(error => {
                this.errorHandler.handle(error);
            });
    }

    filtraCombustivel(event) {
        const query = event.query;

        console.log(query);

        this.combustivelService.findAllCmb(0, 30).then(lista => {
            this.combustivelSugestaoList = lista.content.map(p => ({
                label: p.combustivel.nome,
                value: p.combustivel.key
            }));
        }).catch(error => {
            this.errorHandler.handle(error);
        });
    }

    configurarForm() {
        this.form = this.formBuild.group({
            key: [null],
            nome: [
                null, [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(150)
                ]
            ],
            quantidadeLts: [0, [
                Validators.required,
                Validators.min(0)
            ]],
            combustivel: this.formBuild.group({
                key: [null, Validators.required]
            }),
            inativo: [false]
        });
    }

    save() {
        if (this.form.invalid) {
            this.toasty.add({severity: 'warn', detail: this.traduzir['validacao']['form_invalido']});
            return;
        }

        this.mostrarModalCarregando(true);
        if (this.form.get('key').value) {
            this.tanqueCombustivelService.update(this.form.value).then(response => {
                this.toasty.add({severity: 'success', detail: this.traduzir['tanque-combustivel']['acoes']['atualizar']});
                this.mostrarModalCarregando(false);
                this.router.navigateByUrl(this.traduzir['tanque-combustivel']['link-pagina']);
            }).catch(error => {
                this.errorHandler.handle(error);
                this.mostrarModalCarregando(false);
            });
        } else {
            this.tanqueCombustivelService.save(this.form.value).then(response => {

                this.toasty.add({severity: 'success', detail: this.traduzir['tanque-combustivel']['acoes']['adicionado']});
                this.mostrarModalCarregando(false);
                this.router.navigateByUrl(this.traduzir['tanque-combustivel']['link-pagina']);
            }).catch(erro => {
                this.errorHandler.handle(erro);
                this.mostrarModalCarregando(false);
            });
        }
    }

    cancel() {
        this.router.navigateByUrl(this.traduzir['tanque-combustivel']['link-pagina']);
    }
}
