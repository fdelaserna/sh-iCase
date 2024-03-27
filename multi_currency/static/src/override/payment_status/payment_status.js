/** @odoo-module */
import { PaymentScreenStatus } from "@point_of_sale/app/screens/payment_screen/payment_status/payment_status";
import { patch } from "@web/core/utils/patch";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { useState } from "@odoo/owl";

patch(PaymentScreenStatus.prototype, {
    /**
     * Get the total due text without rounding.
     *
     * @returns {string} The formatted total due without rounding.
     */
     setup() {
        super.setup();
        this.pos = usePos();
    },
    get totalDueText() {
//    console.log('PaymentScreenStatus', this)
        return this.env.utils.formatCurrency(
            this.props.order.get_total_with_tax() + this.props.order.get_rounding_applied()
        );
    }
});
