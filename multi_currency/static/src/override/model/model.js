/** @odoo-module */
import { Payment, Order, Orderline } from "@point_of_sale/app/store/models";
import { patch } from "@web/core/utils/patch";

patch(Order.prototype, {
    setup() {
        super.setup(...arguments);
        this.changed_amount_multi = this.changed_amount_multi || null;
        this.multi_currency_id = this.multi_currency_id || null
        this.multi_currency_amount = this.multi_currency_amount || null
    },
    //@override
    export_as_JSON() {
        const json = super.export_as_JSON(...arguments);
        if (json) {
            json.changed_amount_multi = this.changed_amount_multi;
            json.multi_currency_id = this.multi_currency_id;
            json.multi_currency_amount = this.multi_currency_amount;
        }
        return json;
    },
    //@override
    init_from_JSON(json) {
        super.init_from_JSON(...arguments);
        this.changed_amount_multi = json.changed_amount_multi;
        this.multi_currency_id = json.multi_currency_id;
        this.multi_currency_amount = json.multi_currency_amount;
    },
    ChangedAmount(id) {
        this.changed_amount_multi = id;
    },
    set_multi_currency(multi_currency_id, multi_currency_amount) {
        console.log(44444444444,   multi_currency_id, multi_currency_amount)
        this.multi_currency_id = multi_currency_id
        this.multi_currency_amount = multi_currency_amount
    }
})

patch(Payment.prototype, {
    get_amount() {
        if (this.payment_method.enable_multi_currency){
           var newamount = parseFloat(this.order.changed_amount_multi)
            return newamount;
        }
        else{
            return this.amount;
        }
    },
})
