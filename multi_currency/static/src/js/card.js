/** @odoo-module */
import { AbstractAwaitablePopup } from "@point_of_sale/app/popup/abstract_awaitable_popup";
import { _t } from "@web/core/l10n/translation";
import { useService } from "@web/core/utils/hooks";
import { useState, useEffect } from "@odoo/owl";
export class MultiCurrencyPopup extends AbstractAwaitablePopup {
    setup() {
        this.orm = useService("orm")
        this.state = useState({
            selected_currency: null,
            onchange_amount: false,
            customer_currency: null,
            balance: null,
            rate: null,
            company_balance: null,
            selected_currency_id: null,
        })
        useEffect(() => {
            this.update_value();
            }, () => [this.state.onchange_amount])
        }
    createSelectionOption() {
    var self = this
    if (!Array.isArray(this.props.currency) || this.props.currency.length === 0) {
        console.error("Currency data is invalid or empty.");
        return;
    }
}
    async done(payment) {
    this.confirm();
    }
    getPayload() {
        return {
        pay: this.state.onchange_amount * this.state.rate,
        multi_currency_amount: this.state.onchange_amount,
        multi_currency_id: this.state.selected_currency_id,
        }
    }
    update_value(ev){
        var self=this
        console.log(1234, document.getElementById('currencyOption'))
        var currencyText = document.getElementById('currencyOption').textContent || document.getElementById('currencyOption').innerText;
        console.log(5678,currencyText);
        if (this.state.selected_currency != this.props.company_currency) {
            this.props.currency.forEach(item => {
            console.log(777777, item)
//            item.currency.forEach(it => {
//            })
            if (self.state.onchange_amount == item.currency[1])
              self.state.rate = item.rate
              self.state.customer_currency = self.state.rate ? self.props.due_amount / self.state.rate : 0;
              self.state.balance = self.state.onchange_amount - self.state.customer_currency
              self.state.company_balance = (self.state.onchange_amount - self.state.customer_currency) * self.state.rate
              self.state.selected_currency_id = parseInt(currencyText)
            })
        }
    }
    test(ev){
        console.log(222222, ev)
    }
}
MultiCurrencyPopup.template = "MultiCurrencyPopup";
MultiCurrencyPopup.defaultProps = {
       closePopup: _t("Cancel"),
       confirmKey: _t("Done"),
};
