import { CreateElement } from './helpers/CreateElement';
import { Config } from './interfaces/Config';
import { CreateListElement } from './helpers/CreateListElement';
import { CreateNavButton } from './helpers/CreateNavButton';
import { EnableBtn } from './helpers/EnableBtn';
import { DisableBtn } from './helpers/DisableBtn';

export class Paginator {

    paginator$: HTMLElement;

    items$: HTMLElement[];

    config: Config;

    currentPage: number = 1;

    pageSelected: number = this.currentPage;

    get filtered() {

        return this.config.filtered || 0;
    }

    get total() {

        return this.config.totalItems || this.items$?.length
    }
    get itemsPerPage(): any {

        return this.config?.itemsPerPage || 10;
    }

    get totalPages(): any {

        return Math.ceil(this.total / this.itemsPerPage)
    }

    get start(): any {

        return ((this.currentPage - 1) * (this.itemsPerPage));
    }

    get end(): any {

        let end = this.start + this.itemsPerPage;

        if (end > this.total) {

            end = this.total;
        }
        return end;
    }

    get activeClass() {

        return this.config?.classNames?.active || 'active';
    }

    get maxNumbers() {

        if (this.config?.html?.maxNumbers) {
            return parseInt(this.config?.html?.maxNumbers);
        }

        return 5;
    }
    constructor(items$, config) {

        if (!items$?.length) {

            console.error('The elements to be paginated is empty');

            return;
        }

        if (!config.paginator$) {

            console.error('The paginator wrapping element is empty');

            return;

        }

        this.items$ = items$;

        this.paginator$ = config.paginator$;

        this.config = config;

        if (this.config.currentPage) {
            this.currentPage = this.config.currentPage;
            this.pageSelected = this.currentPage;
        }

        this.paginator$.innerHTML = '';


        this.hideItems();


        this.renderInfoText();

        this.renderNav();

    }


    renderInfoText() {

        if (!this.config.infoText) {

            return;
        }

        let infoText$: any = this.paginator$.querySelector('.skriptx--paginator-info-text');

        if (!infoText$) {
            infoText$ = CreateElement('div', '', 'skriptx--paginator-info-text');
            this.paginator$.append(infoText$);
        }

        const replaced = this.config.infoText
            .replace(':start', (this.start + 1).toString())
            .replace(':end', this.end.toString())
            .replace(':filtered', this.filtered.toString())
            .replace(':total', this.total.toString());
        infoText$.innerHTML = replaced;

    }

    hideItems() {
        if (this.config.server) {
            return;
        }
        this.items$.forEach((item$, index) => {
            item$.style.display = '';
            if (index < this.start || index >= this.end) {
                item$.style.display = 'none';
            }
        })
    }

    renderNav() {

        let li;

        const ul = CreateElement('ul', '', this.config?.classNames?.ul);

        li = CreateNavButton(this.config, '&laquo;', 'first');

        if (li) {

            ul.append(li);

        }

        li = CreateNavButton(this.config, '&lsaquo;', 'prev');

        if (li) {

            ul.append(li);

        }

        if (this.config.html?.hasOwnProperty('number')) {
            if (this.config.html.number) {
                this.renderNumber(ul);
            }

        } else {

            this.renderNumber(ul);
        }




        li = CreateNavButton(this.config, '&rsaquo;', 'next');

        if (li) {

            ul.append(li);

        }

        li = CreateNavButton(this.config, '&raquo;', 'last');

        if (li) {

            ul.append(li);

        }


        const nav = CreateElement('nav', '', this.config?.classNames?.nav);

        nav.append(ul);

        this.paginator$.append(nav);

        this.captureNavButtons();

        this.captureSelect();

        this.disableButtons();

    }

    captureSelect() {

        const nav = this.paginator$.querySelector("nav");

        const select: any = nav?.querySelector('select');

        if (!select) {

            return;
        }

        this.updateSelect();

        select.addEventListener('change', () => {

            this.pageSelected = parseInt(select.value);

            this.onPageChange();

        })
    }

    captureNavButtons() {

        const nav = this.paginator$.querySelector("nav");

        const buttons: any = nav?.querySelectorAll('button');

        if (!buttons?.length) {

            return;
        }
        buttons.forEach(btn => {

            btn.addEventListener('click', () => {

                if (btn.classList.contains('number')) {
                    this.pageSelected = parseInt(btn.innerText);
                }
                if (btn.classList.contains('first')) {
                    this.pageSelected = 1;
                }
                if (btn.classList.contains('last')) {
                    this.pageSelected = parseInt(this.totalPages);
                }
                if (btn.classList.contains('prev')) {
                    this.pageSelected = this.currentPage - 1;
                }
                if (btn.classList.contains('next')) {
                    this.pageSelected = this.currentPage + 1;
                }

                if (this.pageSelected < 1) {
                    this.pageSelected = 1;
                }
                if (this.pageSelected > this.totalPages) {
                    this.pageSelected = this.totalPages;
                }

                this.onPageChange();
            })
        })
    }

    onPageChange() {
        this.emitOnPageChange();
        if (this.config.server) {
            this.paginator$.innerHTML = '';
            return;
        }
        this.currentPage = this.pageSelected;
        this.renderInfoText();
        this.hideItems();
        this.disableButtons();
        this.updateSelect();

    }

    updateSelect() {

        const nav = this.paginator$.querySelector("nav");

        const select: any = nav?.querySelector('select');

        if (!select) {

            return;
        }


        if (select.value != this.currentPage.toString()) {
            select.value = this.currentPage;
        }
    }

    emitOnPageChange() {

        if (this.config.hasOwnProperty('onPageChange') && typeof (this.config.onPageChange) == 'function') {

            this.config.onPageChange({ prev: this.currentPage, now: this.pageSelected });
        }
    }

    renderNumber(ul) {
        let li;
        if (this.totalPages > this.maxNumbers) {

            const select = CreateElement('select', '', this.config?.classNames?.select);
            for (let i = 1; i <= this.totalPages; i++) {
                const option = CreateElement('option', i, '', { value: i })

                select.append(option)

            }
            const li = CreateElement('li');
            const div = CreateElement('div', '', this.config?.classNames?.selectDiv);
            div.append(select);
            li.append(div);
            ul.append(li);

        } else {

            for (let i = 1; i <= this.totalPages; i++) {

                li = CreateListElement(i, 'number', this.config.classNames);

                ul.append(li);

            }
        }
    }

    disableButtons() {
        const nav = this.paginator$.querySelector("nav");

        const buttons: any = nav?.querySelectorAll('button');

        buttons.forEach(btn => {

            EnableBtn(btn, this.activeClass);

            if (btn.classList.contains('number')) {

                if (parseInt(btn.innerText) == this.currentPage) {

                    DisableBtn(btn, this.activeClass);
                }

            }
            if (btn.classList.contains('first') || btn.classList.contains('prev')) {

                if (this.currentPage == 1) {

                    DisableBtn(btn, this.activeClass);
                }

            }
            if (btn.classList.contains('last') || btn.classList.contains('next')) {

                if (this.currentPage == this.totalPages) {

                    DisableBtn(btn, this.activeClass);
                }

            }


        })
    }

}