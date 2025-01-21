import { ClassNames } from "./Classnames";
import { Html } from "./Html";
export interface Config {
infoText:string;
itemsPerPage:number;
classNames?:ClassNames;
totalItems:number,
filtered:number,
html: Html,
onPageChange:Function;
currentPage:number;
server:boolean;
}

