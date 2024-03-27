/** @odoo-module */
import { ClosePosPopup } from "@point_of_sale/app/navbar/closing_popup/closing_popup";
import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";

patch(ClosePosPopup.prototype, {
    setup() {
        super.setup()
        this.orm = useService("orm");
    },
//    async confirm() {
////        super.openDetailsPopup()
//        console.log(757575, this)
//        var variable = await this.orm.searchRead('pos.order', [], []);
//        console.log(565656, variable)
//    }
})
