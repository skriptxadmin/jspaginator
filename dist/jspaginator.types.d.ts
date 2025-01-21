interface ClassNames {
    active?: string;
    wrapper?: string;
    nav?: string;
    ul?: string;
    li?: string;
    button?: string;
    summary?: string;
    span?: string;
    selectDiv?: string;
    select?: string;
}
interface Html {
    prev?: string | boolean;
    next?: string | boolean;
    first?: string | boolean;
    last?: string | boolean;
    number?: string | boolean;
    maxNumbers?: any;
}
interface Config {
    infoText: string;
    itemsPerPage: number;
    classNames?: ClassNames;
    totalItems: number;
    filtered: number;
    html: Html;
    onPageChange: Function;
    currentPage: number;
    server: boolean;
}
export class Paginator {
    paginator$: HTMLElement;
    items$: HTMLElement[];
    config: Config;
    currentPage: number;
    pageSelected: number;
    get filtered(): number;
    get total(): number;
    get itemsPerPage(): any;
    get totalPages(): any;
    get start(): any;
    get end(): any;
    get activeClass(): string;
    get maxNumbers(): number;
    constructor(items$: any, config: any);
    renderInfoText(): void;
    hideItems(): void;
    renderNav(): void;
    captureSelect(): void;
    captureNavButtons(): void;
    onPageChange(): void;
    updateSelect(): void;
    emitOnPageChange(): void;
    renderNumber(ul: any): void;
    disableButtons(): void;
}

//# sourceMappingURL=jspaginator.types.d.ts.map
