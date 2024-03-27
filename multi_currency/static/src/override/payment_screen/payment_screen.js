/** @odoo-module */
import { _t } from "@web/core/l10n/translation";
import { MultiCurrencyPopup } from "@multi_currency/js/card";
import { patch } from "@web/core/utils/patch";
import { ConnectionLostError } from "@web/core/network/rpc_service";
import { ErrorPopup } from "@point_of_sale/app/errors/popups/error_popup";
import { ConfirmPopup } from "@point_of_sale/app/utils/confirm_popup/confirm_popup";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import { useService } from "@web/core/utils/hooks";
import { useRef, useState, onWillStart } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/store/pos_hook";

patch(PaymentScreen.prototype, {
    setup() {
        super.setup();
        this.orm = useService('orm');
        this.popup = useService("popup");
        this.state = useState({
            changed_amount: null,
        })
//        onWillStart(async () =>{
//            console.log(888888888888888, currency)
//        });
//        this.currency = this.orm.search("ir.model", domain, { limit: 1 });
    },
    async addNewPaymentLine(paymentMethod) {
    var self = this
    const currency = await this.orm.searchRead('currency.rate', [], []);
    let confirmed, payload;
        if (paymentMethod.enable_multi_currency) {
      const popupResult = await this.popup.add(MultiCurrencyPopup, {

           title: _t("Multi Currency"),
           due_amount: this.currentOrder.get_due(),
           company_currency: this.pos.company.currency_id,
           currency: currency,
//           paymentMethodID: paymentMethod.id,
//           ConfigID: this.pos.config.id
       });
       confirmed = popupResult.confirmed; // Assign values to variables
       payload = popupResult.payload;
        console.log(55555555555555, confirmed, payload)
       if (confirmed) {
            this.currentOrder.ChangedAmount(payload.pay)
            this.currentOrder.add_paymentline(paymentMethod)
            this.currentOrder.set_multi_currency(payload.multi_currency_id, payload.multi_currency_amount)
            return true;
       }
       else{
        return false
    }
        }
       super.addNewPaymentLine(paymentMethod);
    },
    /**
     * Validate the order.
     *
     * @param {boolean} isForceValidate - Whether to force validation.
     * @returns {boolean} - True if the order is valid, false otherwise.
     */
//    async _isOrderValid(isForceValidate) {
//        if (this.currentOrder.is_credit_card_payment && this.currentOrder.get_paymentlines().length > 0) {
//            if (!this.currentOrder.get_partner()) {
//                const {
//                    confirmed
//                } = await this.popup.add(ConfirmPopup, {
//                    title: _t("Customer Required"),
//                    body: _t("Customer is required if it is a credit card payment."),
//                });
//                if (confirmed) {
//                    this.selectPartner();
//                }
//            } else {
//                return true;
//            }
//        }
////        this.authorize();
////        this.handleCallback();
//        if (this.currentOrder.get_orderlines().length === 0 && this.currentOrder.is_to_invoice()) {
//            this.popup.add(ErrorPopup, {
//                title: _t("Empty Order"),
//                body: _t(
//                    "There must be at least one product in your order before it can be validated and invoiced."
//                ),
//            });
//            return false;
//        }
//        const splitPayments = this.paymentLines.filter(
//            (payment) => payment.payment_method.split_transactions
//        );
//        if (splitPayments.length && !this.currentOrder.get_partner()) {
//            const paymentMethod = splitPayments[0].payment_method;
//            const {
//                confirmed
//            } = await this.popup.add(ConfirmPopup, {
//                title: _t("Customer Required"),
//                body: _t("Customer is required for %s payment method.", paymentMethod.name),
//            });
//            if (confirmed) {
//                this.selectPartner();
//            }
//            return false;
//        }
//        if (
//            (this.currentOrder.is_to_invoice() || this.currentOrder.getShippingDate()) &&
//            !this.currentOrder.get_partner()
//        ) {
//            const {
//                confirmed
//            } = await this.popup.add(ConfirmPopup, {
//                title: _t("Please select the Customer"),
//                body: _t(
//                    "You need to select the customer before you can invoice or ship an order."
//                ),
//            });
//            if (confirmed) {
//                this.selectPartner();
//            }
//            return false;
//        }
//        const partner = this.currentOrder.get_partner();
//        if (
//            this.currentOrder.getShippingDate() &&
//            !(partner.name && partner.street && partner.city && partner.country_id)
//        ) {
//            this.popup.add(ErrorPopup, {
//                title: _t("Incorrect address for shipping"),
//                body: _t("The selected customer needs an address."),
//            });
//            return false;
//        }
//        if (
//            this.currentOrder.get_total_with_tax() != 0 &&
//            this.currentOrder.get_paymentlines().length === 0
//        ) {
//            this.notification.add(_t("Select a payment method to validate the order."));
//            return false;
//        }
//        if (!this.currentOrder.is_paid() || this.invoicing) {
//            return false;
//        }
//        if (this.currentOrder.has_not_valid_rounding()) {
//            var line = this.currentOrder.has_not_valid_rounding();
//            this.popup.add(ErrorPopup, {
//                title: _t("Incorrect rounding"),
//                body: _t(
//                    "You have to round your payments lines." + line.amount + " is not rounded."
//                ),
//            });
//            return false;
//        }
//        // The exact amount must be paid if there is no cash payment method defined.
//        if (
//            Math.abs(
//                this.currentOrder.get_total_with_tax() -
//                this.currentOrder.get_total_paid() +
//                this.currentOrder.get_rounding_applied()
//            ) > 0.00001
//        ) {
//            if (!this.pos.payment_methods.some((pm) => pm.is_cash_count)) {
//                this.popup.add(ErrorPopup, {
//                    title: _t("Cannot return change without a cash payment method"),
//                    body: _t(
//                        "There is no cash payment method available in this point of sale to handle the change.\n\n Please pay the exact amount or add a cash payment method in the point of sale configuration"
//                    ),
//                });
//                return false;
//            }
//        }
//        // if the change is too large, it's probably an input error, make the user confirm.
//        if (
//            !isForceValidate &&
//            this.currentOrder.get_total_with_tax() > 0 &&
//            this.currentOrder.get_total_with_tax() * 1000 < this.currentOrder.get_total_paid()
//        ) {
//            this.popup
//                .add(ConfirmPopup, {
//                    title: _t("Please Confirm Large Amount"),
//                    body: _t("Are you sure that the customer wants to  pay") +
//                        " " +
//                        this.env.utils.formatCurrency(this.currentOrder.get_total_paid()) +
//                        " " +
//                        _t("for an order of") +
//                        " " +
//                        this.env.utils.formatCurrency(this.currentOrder.get_total_with_tax()) +
//                        " " +
//                        _t('? Clicking "Confirm" will validate the payment.'),
//                })
//                .then(({
//                    confirmed
//                }) => {
//                    if (confirmed) {
//                        this.validateOrder(true);
//                    }
//                });
//            return false;
//        }
//        if (!this.currentOrder._isValidEmptyOrder()) {
//            return false;
//        }
//        return true;
//    },
//    /**
//     * Delete a payment line.
//     *
//     * @param {string} cid - The client ID of the payment line to be deleted.
//     */
//    async deletePaymentLine(cid) {
//        const line = this.paymentLines.find((line) => line.cid === cid);
//        if (line.is_paid) {
//            await this.popup.add(ErrorPopup, {
//                title: _t("Error"),
//                body: _t(
//                    "You cannot delete this paid line."
//                ),
//            });
//            return;
//        }
//        // If a paymentline with a payment terminal linked to
//        // it is removed, the terminal should get a cancel
//        // request.
//        if (["waiting", "waitingCard", "timeout"].includes(line.get_payment_status())) {
//            line.set_payment_status("waitingCancel");
//            line.payment_method.payment_terminal
//                .send_payment_cancel(this.currentOrder, cid)
//                .then(() => {
//                    this.currentOrder.remove_paymentline(line);
//                    this.numberBuffer.reset();
//                });
//        } else if (line.get_payment_status() !== "waitingCancel") {
//            this.currentOrder.remove_paymentline(line);
//            this.numberBuffer.reset();
//        }
//    },
//    /**
//     * Update the selected payment line with the given amount.
//     *
//     * @param {number} amount - The amount to update the selected payment line with.
//     */
//    updateSelectedPaymentline(amount = false) {
//        if (this.paymentLines.every((line) => line.paid)) {
//            this.currentOrder.add_paymentline(this.payment_methods_from_config[0]);
//        }
//        if (!this.selectedPaymentLine || this.selectedPaymentLine.is_paid) {
//            // Do nothing if no selected payment line or if it's already paid
//            return;
//        }
//        if (!this.selectedPaymentLine) {
//            return;
//        } // do nothing if no selected payment line
//        if (amount === false) {
//            if (this.numberBuffer.get() === null) {
//                amount = null;
//            } else if (this.numberBuffer.get() === "") {
//                amount = 0;
//            } else {
//                amount = this.numberBuffer.getFloat();
//            }
//        }
//        // disable changing amount on paymentlines with running or done payments on a payment terminal
//        const payment_terminal = this.selectedPaymentLine.payment_method.payment_terminal;
//        const hasCashPaymentMethod = this.payment_methods_from_config.some(
//            (method) => method.type === "cash"
//        );
//        if (
//            !hasCashPaymentMethod &&
//            amount > this.currentOrder.get_due() + this.selectedPaymentLine.amount
//        ) {
//            this.selectedPaymentLine.set_amount(0);
//            this.numberBuffer.set(this.currentOrder.get_due().toString());
//            amount = this.currentOrder.get_due();
//            this.showMaxValueError();
//        }
//        if (
//            payment_terminal &&
//            !["pending", "retry"].includes(this.selectedPaymentLine.get_payment_status())
//        ) {
//            return;
//        }
//        if (amount === null) {
//            this.deletePaymentLine(this.selectedPaymentLine.cid);
//        } else {
//            this.selectedPaymentLine.set_amount(amount);
//        }
//    }
})
