import { CreateListElement } from "./CreateListElement";
export function CreateNavButton(config, defaultContent, key) {

    if (config?.html?.hasOwnProperty(key)) {
        if (config.html[key]) {
            const trimmed = config?.html[key]?.toString().trim();
            if(!trimmed){
                return null;
            }
            return CreateListElement(trimmed, key, config.classNames);

        }

        return null;

    }

    return CreateListElement(defaultContent, key, config.classNames);

}