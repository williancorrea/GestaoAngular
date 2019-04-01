import {AfterViewInit, Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {AuthService} from './security/auth.service';

enum MenuOrientation {
    STATIC,
    OVERLAY
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy, OnInit {

    activeTabIndex: number;

    sidebarActive: boolean;

    layoutMode: MenuOrientation = MenuOrientation.STATIC;

    darkMenu = false;

    topbarMenuActive: boolean;

    sidebarClick: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    telacheia: boolean;

    documentClickListener: Function;
    private subscription: Subscription;

    constructor(public renderer: Renderer2,
                public translate: TranslateService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private titulo: Title,
                private auth: AuthService) {


        // Esse idioma será usado como um substituto quando uma tradução não for encontrada no idioma atual
        translate.setDefaultLang('pt-BR');

        // O idioma a ser usado, se o idioma não estiver disponível, ele usará o carregador atual para obtê-los
        translate.use('pt-BR');
    }

    ngAfterViewInit() {
        this.documentClickListener = this.renderer.listen('body', 'click', (event) => {
            if (!this.topbarItemClick) {
                this.activeTopbarItem = null;
                this.topbarMenuActive = false;
            }

            if (!this.sidebarClick && (this.overlay || !this.isDesktop())) {
                this.sidebarActive = false;
            }

            this.topbarItemClick = false;
            this.sidebarClick = false;
        });
    }

    onTabClick(event, index: number) {
        if (this.activeTabIndex === index) {
            this.sidebarActive = !this.sidebarActive;
        } else {
            this.activeTabIndex = index;
            this.sidebarActive = true;
        }

        event.preventDefault();
    }

    closeSidebar(event) {
        this.sidebarActive = false;
        event.preventDefault();
    }

    onSidebarClick(event) {
        this.sidebarClick = true;
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }

        event.preventDefault();
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    get overlay(): boolean {
        return this.layoutMode === MenuOrientation.OVERLAY;
    }

    changeToStaticMenu() {
        this.layoutMode = MenuOrientation.STATIC;
    }

    changeToOverlayMenu() {
        this.layoutMode = MenuOrientation.OVERLAY;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    }

    ngOnInit() {
        // subscribe to router event
        this.subscription = this.activatedRoute.queryParams.subscribe(
            (param: any) => {
                const locale = param['locale'];
                if (locale !== undefined) {
                    this.translate.use(locale);
                }

                this.translate.get('app').subscribe(s => {
                    this.titulo.setTitle(s['sistema']['titulo']);
                });

                // this.showPage = !this.auth.isInvalidAccessToken();
            });
    }

    showMenus(): boolean {
        // return !this.auth.isInvalidAccessToken();
        return (this.router.url !== '/login' && this.router.url !== '/pagina-nao-encontrada' && this.router.url !== '/erro');
    }

    changeLanguage(lang) {
        this.translate.use(lang);
    }


    abrirTelaCheia(event, item) {
        this.telacheia = !this.telacheia;
        if (this.telacheia) {
            const elem = document.documentElement;
            if (elem['requestFullscreen']) {
                elem.requestFullscreen();
            } else if (elem['mozRequestFullScreen']) { /* Firefox */
                elem['mozRequestFullScreen']();
            } else if (elem['webkitRequestFullscreen']) { /* Chrome, Safari & Opera */
                elem['webkitRequestFullscreen']();
            } else if (elem['msRequestFullscreen']) { /* IE/Edge */
                elem['msRequestFullscreen']();
            }
        } else {
            if (document['exitFullscreen']) {
                document.exitFullscreen();
            } else if (document['mozCancelFullScreen']) {
                document['mozCancelFullScreen']();
            } else if (document['webkitExitFullscreen']) {
                document['webkitExitFullscreen']();
            } else if (document['msExitFullscreen']) {
                document['msExitFullscreen']();
            }
        }
        event.preventDefault();
    }
}
