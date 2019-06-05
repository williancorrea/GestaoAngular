import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {VeiculoService} from '../veiculo.service';
import {ErroManipuladorService} from '../../../../core/erro-manipulador.service';
import {AuthService} from '../../../../security/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseFormComponent} from '../../../../transport-shared/base-form/base-form.component';
import {TranslateService} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-bank-new',
    templateUrl: './veiculo-novo.component.html',
    styleUrls: ['./veiculo-novo.component.css']
})
export class VeiculoNovoComponent extends BaseFormComponent implements OnInit {

    traduzir: any;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private translateService: TranslateService,
                private titulo: Title,
                private veiculoService: VeiculoService,
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
                this.titulo.setTitle(this.traduzir['veiculo']['acoes']['editar']);

                this.veiculoService.findOne(editando).then(response => {
                    // this.bank = response;
                    this.form.patchValue(response);
                    this.mostrarModalCarregando(false);
                }).catch(error => {
                    this.errorHandler.handle(error);
                    this.titulo.setTitle(this.traduzir['veiculo']['acoes']['adicionar']);
                    this.mostrarModalCarregando(false);
                });
            } else {
                this.titulo.setTitle(this.traduzir['veiculo']['acoes']['adicionar']);
                this.mostrarModalCarregando(false);
            }
        });
    }

    configurarForm() {
        this.form = this.formBuild.group({
            key: [null],
            placa: [
                null, [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(8)
                ]
            ],
            frota: [
                null, [
                    Validators.maxLength(15),
                ]
            ],
            odometroInicial: [null],
            inativo: [false]
        });
    }

    save() {
        if (this.form.valid) {
            this.mostrarModalCarregando(true);
            if (this.form.get('key').value) {
                this.veiculoService.update(this.form.value).then(response => {
                    this.toasty.add({severity: 'success', detail: this.traduzir['veiculo']['acoes']['atualizar']});
                    this.mostrarModalCarregando(false);
                    this.router.navigateByUrl(this.traduzir['veiculo']['link-pagina']);
                }).catch(error => {
                    this.errorHandler.handle(error);
                    this.mostrarModalCarregando(false);
                });
            } else {
                this.veiculoService.save(this.form.value).then(response => {

                    this.toasty.add({severity: 'success', detail: this.traduzir['veiculo']['acoes']['adicionado']});
                    this.mostrarModalCarregando(false);
                    this.router.navigateByUrl(this.traduzir['veiculo']['link-pagina']);
                }).catch(erro => {
                    this.errorHandler.handle(erro);
                    this.mostrarModalCarregando(false);
                });
            }
        } else {
            this.toasty.add({severity: 'warn', detail: this.traduzir['validacao']['form_invalido']});
        }
    }

    cancel() {
        this.router.navigateByUrl(this.traduzir['veiculo']['link-pagina']);
    }
}
