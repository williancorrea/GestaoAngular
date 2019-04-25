import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {BancoService} from '../banco.service';
import {ErroManipuladorService} from '../../../../core/erro-manipulador.service';
import {AuthService} from '../../../../security/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseFormComponent} from '../../../../transport-shared/base-form/base-form.component';
import {TranslateService} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';

@Component({
    selector: 'app-bank-new',
    templateUrl: './banco-novo.component.html',
    styleUrls: ['./banco-novo.component.css']
})
export class BancoNovoComponent extends BaseFormComponent implements OnInit {

    traduzir: any;
    mostrarDialogoLogo = false;


    imageChangedEvent: any = '';
    croppedImage: any = '';
    showCropper = false;
    imagemSelecionada = false;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private translateService: TranslateService,
                private titulo: Title,
                private bankService: BancoService,
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
                this.titulo.setTitle(this.traduzir['banco']['acoes']['editar']);

                this.bankService.findOne(editando).then(response => {
                    // this.bank = response;
                    this.form.patchValue(response);
                    this.mostrarModalCarregando(false);
                }).catch(error => {
                    this.errorHandler.handle(error);
                    this.titulo.setTitle(this.traduzir['banco']['acoes']['adicionar']);
                    this.mostrarModalCarregando(false);
                });
            } else {
                this.titulo.setTitle(this.traduzir['banco']['acoes']['adicionar']);
                this.mostrarModalCarregando(false);
            }
        });
    }

    configurarForm() {
        this.form = this.formBuild.group({
            key: [null],
            codigo: [null, Validators.maxLength(10)],
            nome: [
                null, [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(150)
                ]
            ],
            url: [null, Validators.maxLength(150)],
            logo: [''],
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
            this.bankService.update(this.form.value).then(response => {
                this.toasty.add({severity: 'success', detail: this.traduzir['banco']['acoes']['atualizar']});
                this.mostrarModalCarregando(false);
                this.router.navigateByUrl(this.traduzir['banco']['link-pagina']);
            }).catch(error => {
                this.errorHandler.handle(error);
                this.mostrarModalCarregando(false);
            });
        } else {
            this.bankService.save(this.form.value).then(response => {

                this.toasty.add({severity: 'success', detail: this.traduzir['banco']['acoes']['adicionado']});
                this.mostrarModalCarregando(false);
                this.router.navigateByUrl(this.traduzir['banco']['link-pagina']);
            }).catch(erro => {
                this.errorHandler.handle(erro);
                this.mostrarModalCarregando(false);
            });
        }
    }

    cancel() {
        this.router.navigateByUrl(this.traduzir['banco']['link-pagina']);
    }


    mostrarDialogCortarImagem() {
        this.imagemSelecionada = false;
        this.mostrarDialogoLogo = true;
        this.croppedImage = '';
        this.showCropper = false;
        this.fileInput.nativeElement.value = '';
    }

    @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

    @ViewChild('fileInput')
    fileInput: ElementRef;


    fileChangeEvent(event: any): void {
        console.log('change', event)

        // VARIFICA SE FOI SELECIONADO ALGUMA IMAGEM
        const target = event.target || event.srcElement;
        if (target.value.length === 0) {
            this.imagemSelecionada = false;
            this.croppedImage = '';
            this.showCropper = false;
            return;
        }

        this.imageChangedEvent = event;
        this.imagemSelecionada = true;
        this.croppedImage = '';
        this.showCropper = false;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        console.log(event);
    }

    imageLoaded() {
        this.showCropper = true;
        console.log('Image loaded');
    }

    cropperReady() {
        console.log('Cropper ready');
    }

    loadImageFailed() {
        this.imagemSelecionada = false;
        console.log('Load failed');
    }

    rotateLeft() {
        this.imageCropper.rotateLeft();
    }

    rotateRight() {
        this.imageCropper.rotateRight();
    }

    flipHorizontal() {
        this.imageCropper.flipHorizontal();
    }

    flipVertical() {
        this.imageCropper.flipVertical();
    }
}
