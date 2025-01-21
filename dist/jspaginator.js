var t,e={};function s(t,e="",i="",a={}){let n=document.createElement(t);for(let t in a)n.setAttribute(t,a[t]);let r=i.trim();return r&&r.split(" ").map(t=>t.trim()).filter(t=>t).forEach(t=>{n.classList.add(t)}),n.innerHTML=e,n}function i(t,e,a={}){let n,r,l;return n=s("li","",a?.li),r=s("button","",`page ${e} ${a?.button?a.button:""}`),l=s("span",t,a?.span),r.append(l),n.append(r),n}function a(t,e,s){if(t?.html?.hasOwnProperty(s)){if(t.html[s]){let e=t?.html[s]?.toString().trim();return e?i(e,s,t.classNames):null}return null}return i(e,s,t.classNames)}function n(t,e){t.classList.contains("number")||t.closest("li").classList.add("disabled"),t.setAttribute("disabled",!0),t.classList.add(e)}Object.defineProperty(e,"Paginator",{get:()=>r,set:void 0,enumerable:!0,configurable:!0});class r{paginator$;items$;config;currentPage=1;pageSelected=this.currentPage;get filtered(){return this.config.filtered||0}get total(){return this.config.totalItems||this.items$?.length}get itemsPerPage(){return this.config?.itemsPerPage||10}get totalPages(){return Math.ceil(this.total/this.itemsPerPage)}get start(){return(this.currentPage-1)*this.itemsPerPage}get end(){let t=this.start+this.itemsPerPage;return t>this.total&&(t=this.total),t}get activeClass(){return this.config?.classNames?.active||"active"}get maxNumbers(){return this.config?.html?.maxNumbers?parseInt(this.config?.html?.maxNumbers):5}constructor(t,e){if(!t?.length){console.error("The elements to be paginated is empty");return}if(!e.paginator$){console.error("The paginator wrapping element is empty");return}this.items$=t,this.paginator$=e.paginator$,this.config=e,this.config.currentPage&&(this.currentPage=this.config.currentPage,this.pageSelected=this.currentPage),this.paginator$.innerHTML="",this.hideItems(),this.renderInfoText(),this.renderNav()}renderInfoText(){if(!this.config.infoText)return;let t=this.paginator$.querySelector(".skriptx--paginator-info-text");t||(t=s("div","","skriptx--paginator-info-text"),this.paginator$.append(t));let e=this.config.infoText.replace(":start",(this.start+1).toString()).replace(":end",this.end.toString()).replace(":filtered",this.filtered.toString()).replace(":total",this.total.toString());t.innerHTML=e}hideItems(){this.config.server||this.items$.forEach((t,e)=>{t.style.display="",(e<this.start||e>=this.end)&&(t.style.display="none")})}renderNav(){let t;let e=s("ul","",this.config?.classNames?.ul);(t=a(this.config,"&laquo;","first"))&&e.append(t),(t=a(this.config,"&lsaquo;","prev"))&&e.append(t),this.config.html?.hasOwnProperty("number")?this.config.html.number&&this.renderNumber(e):this.renderNumber(e),(t=a(this.config,"&rsaquo;","next"))&&e.append(t),(t=a(this.config,"&raquo;","last"))&&e.append(t);let i=s("nav","",this.config?.classNames?.nav);i.append(e),this.paginator$.append(i),this.captureNavButtons(),this.captureSelect(),this.disableButtons()}captureSelect(){let t=this.paginator$.querySelector("nav"),e=t?.querySelector("select");e&&(this.updateSelect(),e.addEventListener("change",()=>{this.pageSelected=parseInt(e.value),this.onPageChange()}))}captureNavButtons(){let t=this.paginator$.querySelector("nav"),e=t?.querySelectorAll("button");e?.length&&e.forEach(t=>{t.addEventListener("click",()=>{t.classList.contains("number")&&(this.pageSelected=parseInt(t.innerText)),t.classList.contains("first")&&(this.pageSelected=1),t.classList.contains("last")&&(this.pageSelected=parseInt(this.totalPages)),t.classList.contains("prev")&&(this.pageSelected=this.currentPage-1),t.classList.contains("next")&&(this.pageSelected=this.currentPage+1),this.pageSelected<1&&(this.pageSelected=1),this.pageSelected>this.totalPages&&(this.pageSelected=this.totalPages),this.onPageChange()})})}onPageChange(){if(this.emitOnPageChange(),this.config.server){this.paginator$.innerHTML="";return}this.currentPage=this.pageSelected,this.renderInfoText(),this.hideItems(),this.disableButtons(),this.updateSelect()}updateSelect(){let t=this.paginator$.querySelector("nav"),e=t?.querySelector("select");e&&e.value!=this.currentPage.toString()&&(e.value=this.currentPage)}emitOnPageChange(){this.config.hasOwnProperty("onPageChange")&&"function"==typeof this.config.onPageChange&&this.config.onPageChange({prev:this.currentPage,now:this.pageSelected})}renderNumber(t){let e;if(this.totalPages>this.maxNumbers){let e=s("select","",this.config?.classNames?.select);for(let t=1;t<=this.totalPages;t++){let i=s("option",t,"",{value:t});e.append(i)}let i=s("li"),a=s("div","",this.config?.classNames?.selectDiv);a.append(e),i.append(a),t.append(i)}else for(let s=1;s<=this.totalPages;s++)e=i(s,"number",this.config.classNames),t.append(e)}disableButtons(){let t=this.paginator$.querySelector("nav");(t?.querySelectorAll("button")).forEach(t=>{var e;e=this.activeClass,t.classList.contains("number")||t.closest("li").classList.remove("disabled"),t.removeAttribute("disabled"),t.classList.remove(e),t.classList.contains("number")&&parseInt(t.innerText)==this.currentPage&&n(t,this.activeClass),(t.classList.contains("first")||t.classList.contains("prev"))&&1==this.currentPage&&n(t,this.activeClass),(t.classList.contains("last")||t.classList.contains("next"))&&this.currentPage==this.totalPages&&n(t,this.activeClass)})}}t=module.exports,Object.keys(e).forEach(function(s){"default"===s||"__esModule"===s||Object.prototype.hasOwnProperty.call(t,s)||Object.defineProperty(t,s,{enumerable:!0,get:function(){return e[s]}})});
//# sourceMappingURL=jspaginator.js.map
