import { DarkHeresyItemSheet } from "./item.js";

export class WeaponSheet extends DarkHeresyItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["dark-heresy", "sheet", "weapon"],
            template: "systems/dark-heresy-rt/template/sheet/weapon.html",
            width: 500,
            height: 369,
            resizable: false,
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "stats",
                },
            ]
        });
    }

    getData() {
        const data = super.getData();
        return data;
    }

    _getHeaderButtons() {
        let buttons = super._getHeaderButtons();
        buttons = [].concat(buttons);
        return buttons;
    }

    activateListeners(html) {
        super.activateListeners(html);
    }
}
