import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {CombustivelService} from '../combustivel.service';
import {ErroManipuladorService} from '../../../../core/erro-manipulador.service';
import {AuthService} from '../../../../security/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseFormComponent} from '../../../../transport-shared/base-form/base-form.component';
import {TranslateService} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-combustivel-new',
    templateUrl: './combustivel-novo.component.html',
    styleUrls: ['./combustivel-novo.component.css']
})
export class CombustivelNovoComponent extends BaseFormComponent implements OnInit {

    traduzir: any;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private translateService: TranslateService,
                private titulo: Title,
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

            if (editando) {
                this.titulo.setTitle(this.traduzir['combustivel']['acoes']['editar']);

                this.combustivelService.findOne(editando).then(response => {
                    // this.combustivel = response;
                    this.form.patchValue(response);
                    this.mostrarModalCarregando(false);
                }).catch(error => {
                    this.errorHandler.handle(error);
                    this.titulo.setTitle(this.traduzir['combustivel']['acoes']['adicionar']);
                    this.mostrarModalCarregando(false);
                });
            } else {
                this.titulo.setTitle(this.traduzir['combustivel']['acoes']['adicionar']);
                this.mostrarModalCarregando(false);
            }
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
            this.combustivelService.update(this.form.value).then(response => {
                this.toasty.add({severity: 'success', detail: this.traduzir['combustivel']['acoes']['atualizar']});
                this.mostrarModalCarregando(false);
                this.router.navigateByUrl(this.traduzir['combustivel']['link-pagina']);
            }).catch(error => {
                this.errorHandler.handle(error);
                this.mostrarModalCarregando(false);
            });
        } else {
            this.combustivelService.save(this.form.value).then(response => {

                this.toasty.add({severity: 'success', detail: this.traduzir['combustivel']['acoes']['adicionado']});
                this.mostrarModalCarregando(false);
                this.router.navigateByUrl(this.traduzir['combustivel']['link-pagina']);
            }).catch(erro => {
                this.errorHandler.handle(erro);
                this.mostrarModalCarregando(false);
            });
        }

    }

    cancel() {
        this.router.navigateByUrl(this.traduzir['combustivel']['link-pagina']);
    }
}
