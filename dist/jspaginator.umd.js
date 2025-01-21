
function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $d4d280ce40912760$exports = {};

$parcel$export($d4d280ce40912760$exports, "Paginator", () => $d4d280ce40912760$export$98986e0ddad1af5a);
function $04aafea2ee4a96c8$export$b11b83b4c0e60f43(ele, html = '', classNames = '', attributes = {}) {
    const ele$ = document.createElement(ele);
    for(let key in attributes)ele$.setAttribute(key, attributes[key]);
    const classNamesTrimmed = classNames.trim();
    if (classNamesTrimmed) {
        const classNamesSplitted = classNamesTrimmed.split(' ');
        const classNamesMapped = classNamesSplitted.map((v)=>v.trim()).filter((v)=>v);
        classNamesMapped.forEach((className)=>{
            ele$.classList.add(className);
        });
    }
    ele$.innerHTML = html;
    return ele$;
}



function $9d8a7340e3a1da8e$export$8fa3b0623dc5004a(content, btnClassname, classNames = {}) {
    let li, btn, span;
    li = (0, $04aafea2ee4a96c8$export$b11b83b4c0e60f43)('li', '', classNames?.li);
    btn = (0, $04aafea2ee4a96c8$export$b11b83b4c0e60f43)('button', '', `page ${btnClassname} ${classNames?.button ? classNames.button : ''}`);
    span = (0, $04aafea2ee4a96c8$export$b11b83b4c0e60f43)('span', content, classNames?.span);
    btn.append(span);
    li.append(btn);
    return li;
}



function $5855c7109f5ddbdd$export$f01981a96f40f9c3(config, defaultContent, key) {
    if (config?.html?.hasOwnProperty(key)) {
        if (config.html[key]) {
            const trimmed = config?.html[key]?.toString().trim();
            if (!trimmed) return null;
            return (0, $9d8a7340e3a1da8e$export$8fa3b0623dc5004a)(trimmed, key, config.classNames);
        }
        return null;
    }
    return (0, $9d8a7340e3a1da8e$export$8fa3b0623dc5004a)(defaultContent, key, config.classNames);
}


function $cfdf2704008fb6f4$export$6ae0c356a95a937b(btn, activeClass) {
    if (!btn.classList.contains('number')) btn.closest('li').classList.remove('disabled');
    btn.removeAttribute('disabled');
    btn.classList.remove(activeClass);
}


function $a318dd636e8fabe8$export$989e9142cd3eb435(btn, activeClass) {
    if (!btn.classList.contains('number')) btn.closest('li').classList.add('disabled');
    btn.setAttribute('disabled', true);
    btn.classList.add(activeClass);
}


class $d4d280ce40912760$export$98986e0ddad1af5a {
    get filtered() {
        return this.config.filtered || 0;
    }
    get total() {
        return this.config.totalItems || this.items$?.length;
    }
    get itemsPerPage() {
        return this.config?.itemsPerPage || 10;
    }
    get totalPages() {
        return Math.ceil(this.total / this.itemsPerPage);
    }
    get start() {
        return (this.currentPage - 1) * this.itemsPerPage;
    }
    get end() {
        let end = this.start + this.itemsPerPage;
        if (end > this.total) end = this.total;
        return end;
    }
    get activeClass() {
        return this.config?.classNames?.active || 'active';
    }
    get maxNumbers() {
        if (this.config?.html?.maxNumbers) return parseInt(this.config?.html?.maxNumbers);
        return 5;
    }
    constructor(items$, config){
        this.currentPage = 1;
        this.pageSelected = this.currentPage;
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
        if (!this.config.infoText) return;
        let infoText$ = this.paginator$.querySelector('.skriptx--paginator-info-text');
        if (!infoText$) {
            infoText$ = (0, $04aafea2ee4a96c8$export$b11b83b4c0e60f43)('div', '', 'skriptx--paginator-info-text');
            this.paginator$.append(infoText$);
        }
        const replaced = this.config.infoText.replace(':start', (this.start + 1).toString()).replace(':end', this.end.toString()).replace(':filtered', this.filtered.toString()).replace(':total', this.total.toString());
        infoText$.innerHTML = replaced;
    }
    hideItems() {
        if (this.config.server) return;
        this.items$.forEach((item$, index)=>{
            item$.style.display = '';
            if (index < this.start || index >= this.end) item$.style.display = 'none';
        });
    }
    renderNav() {
        let li;
        const ul = (0, $04aafea2ee4a96c8$export$b11b83b4c0e60f43)('ul', '', this.config?.classNames?.ul);
        li = (0, $5855c7109f5ddbdd$export$f01981a96f40f9c3)(this.config, '&laquo;', 'first');
        if (li) ul.append(li);
        li = (0, $5855c7109f5ddbdd$export$f01981a96f40f9c3)(this.config, '&lsaquo;', 'prev');
        if (li) ul.append(li);
        if (this.config.html?.hasOwnProperty('number')) {
            if (this.config.html.number) this.renderNumber(ul);
        } else this.renderNumber(ul);
        li = (0, $5855c7109f5ddbdd$export$f01981a96f40f9c3)(this.config, '&rsaquo;', 'next');
        if (li) ul.append(li);
        li = (0, $5855c7109f5ddbdd$export$f01981a96f40f9c3)(this.config, '&raquo;', 'last');
        if (li) ul.append(li);
        const nav = (0, $04aafea2ee4a96c8$export$b11b83b4c0e60f43)('nav', '', this.config?.classNames?.nav);
        nav.append(ul);
        this.paginator$.append(nav);
        this.captureNavButtons();
        this.captureSelect();
        this.disableButtons();
    }
    captureSelect() {
        const nav = this.paginator$.querySelector("nav");
        const select = nav?.querySelector('select');
        if (!select) return;
        this.updateSelect();
        select.addEventListener('change', ()=>{
            this.pageSelected = parseInt(select.value);
            this.onPageChange();
        });
    }
    captureNavButtons() {
        const nav = this.paginator$.querySelector("nav");
        const buttons = nav?.querySelectorAll('button');
        if (!buttons?.length) return;
        buttons.forEach((btn)=>{
            btn.addEventListener('click', ()=>{
                if (btn.classList.contains('number')) this.pageSelected = parseInt(btn.innerText);
                if (btn.classList.contains('first')) this.pageSelected = 1;
                if (btn.classList.contains('last')) this.pageSelected = parseInt(this.totalPages);
                if (btn.classList.contains('prev')) this.pageSelected = this.currentPage - 1;
                if (btn.classList.contains('next')) this.pageSelected = this.currentPage + 1;
                if (this.pageSelected < 1) this.pageSelected = 1;
                if (this.pageSelected > this.totalPages) this.pageSelected = this.totalPages;
                this.onPageChange();
            });
        });
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
        const select = nav?.querySelector('select');
        if (!select) return;
        if (select.value != this.currentPage.toString()) select.value = this.currentPage;
    }
    emitOnPageChange() {
        if (this.config.hasOwnProperty('onPageChange') && typeof this.config.onPageChange == 'function') this.config.onPageChange({
            prev: this.currentPage,
            now: this.pageSelected
        });
    }
    renderNumber(ul) {
        let li;
        if (this.totalPages > this.maxNumbers) {
            const select = (0, $04aafea2ee4a96c8$export$b11b83b4c0e60f43)('select', '', this.config?.classNames?.select);
            for(let i = 1; i <= this.totalPages; i++){
                const option = (0, $04aafea2ee4a96c8$export$b11b83b4c0e60f43)('option', i, '', {
                    value: i
                });
                select.append(option);
            }
            const li = (0, $04aafea2ee4a96c8$export$b11b83b4c0e60f43)('li');
            const div = (0, $04aafea2ee4a96c8$export$b11b83b4c0e60f43)('div', '', this.config?.classNames?.selectDiv);
            div.append(select);
            li.append(div);
            ul.append(li);
        } else for(let i = 1; i <= this.totalPages; i++){
            li = (0, $9d8a7340e3a1da8e$export$8fa3b0623dc5004a)(i, 'number', this.config.classNames);
            ul.append(li);
        }
    }
    disableButtons() {
        const nav = this.paginator$.querySelector("nav");
        const buttons = nav?.querySelectorAll('button');
        buttons.forEach((btn)=>{
            (0, $cfdf2704008fb6f4$export$6ae0c356a95a937b)(btn, this.activeClass);
            if (btn.classList.contains('number')) {
                if (parseInt(btn.innerText) == this.currentPage) (0, $a318dd636e8fabe8$export$989e9142cd3eb435)(btn, this.activeClass);
            }
            if (btn.classList.contains('first') || btn.classList.contains('prev')) {
                if (this.currentPage == 1) (0, $a318dd636e8fabe8$export$989e9142cd3eb435)(btn, this.activeClass);
            }
            if (btn.classList.contains('last') || btn.classList.contains('next')) {
                if (this.currentPage == this.totalPages) (0, $a318dd636e8fabe8$export$989e9142cd3eb435)(btn, this.activeClass);
            }
        });
    }
}


$parcel$exportWildcard(module.exports, $d4d280ce40912760$exports);


//# sourceMappingURL=jspaginator.umd.js.map
